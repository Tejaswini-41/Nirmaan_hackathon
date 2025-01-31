const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Function to generate unique order ID
const generateOrderId = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD${timestamp}${random}`;
};

// Get all orders for the authenticated user
router.get("/",   authMiddleware ,async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ orderDate: -1 }); // Sort by newest first
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      message: "Error fetching orders", 
      error: error.message 
    });
  }
});

// Create new order
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log('Received order request:', req.body);
    console.log('User from token:', req.user);

    const { items, totalAmount } = req.body;

    // Validate request body
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        message: "Invalid order items",
        details: "Items array is required and must not be empty"
      });
    }

    if (!totalAmount || typeof totalAmount !== 'number') {
      return res.status(400).json({ 
        message: "Invalid total amount",
        details: "Total amount must be a number"
      });
    }

    // Generate unique order ID
    const orderId = generateOrderId();

    // Map the items to match the Order schema
    const validatedItems = items.map(item => {
      // Map paperSize to size and ensure all required fields exist
      return {
        file: item.file || '',
        copies: Number(item.copies) || 0,
        size: item.paperSize || 'A4', // Map paperSize to size
        color: item.color || 'Black & White',
        sides: item.sides || 'Single-sided',
        pages: String(item.pages) || '1', // Convert to string as per schema
        estimatedPrice: Number(item.estimatedPrice) || 0
      };
    });

    // Create new order
    const order = new Order({
      orderId,
      userId: req.user.id,
      items: validatedItems,
      totalAmount: totalAmount
    });

    console.log('Creating order:', order);

    // Save order to database
    const savedOrder = await order.save();
    console.log('Order saved successfully:', savedOrder);
    
    res.status(201).json({ 
      message: "Order placed successfully", 
      order: savedOrder 
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ 
      message: "Error creating order", 
      error: error.message,
      stack: error.stack
    });
  }
});

// ... rest of the routes ...

module.exports = router; 