import { useState, useEffect, useContext } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../slices/printJobSlice';
import { useNavigate } from 'react-router-dom';
import { RazorpayContext } from '../context/RazorpayContext';

const CartSection = () => {
  
    const { loadRazorpayScript } = useContext(RazorpayContext);
  
    const handlePayment = async () => {
      try {
        setIsProcessing(true);
        setError("");

        // Load Razorpay script
        const res = await loadRazorpayScript();
        if (!res) {
          setError('Razorpay SDK failed to load. Are you online?');
          setIsProcessing(false);
          return;
        }

        // Create order in your backend
        const response = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            items: cartRedux,
            totalAmount: totalCost * 1.18 // Including GST
          })
        });

        const orderData = await response.json();
        
        // Initialize Razorpay payment
        const options = {
          key: 'rzp_test_1DP5mmOlF5G5ag',
          amount: (totalCost * 1.18 * 100).toFixed(0), // Convert to paise
          currency: 'INR',
          name: 'PrintEase',
          description: 'Print Job Payment',
          order_id: orderData.orderId,
          handler: async function (response) {
            // Payment successful
            try {
              // Update order status
              await fetch(`http://localhost:5000/api/orders/${orderData.orderId}/payment`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                  paymentId: response.razorpay_payment_id
                })
              });

              // Clear cart after successful payment
              dispatch(clearCart());
              navigate('/student/dashboard');
            } catch (error) {
              setError('Error updating payment status');
            }
          },
          prefill: {
            name: 'Student',
            email: 'student@example.com'
          },
          theme: {
            color: '#F59E0B'
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        setError(error.message || 'Error processing payment');
      } finally {
        setIsProcessing(false);
      }
    };
  
    const dispatch = useDispatch();
    const cartRedux = useSelector((state) => state.printJob.cart);
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");

    // Calculate total cost
    const totalCost = cartRedux.reduce((sum, item) => sum + item.estimatedPrice, 0);

    const handleRemoveFromCart = (id) => {
      dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
      dispatch(clearCart());
    };
  
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Cart</h2>
        {cartRedux.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul className="space-y-4">
              {cartRedux.map((item, index) => (
                <li key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold mb-2">{item.file}</h3>
                  <p>Copies: {item.copies}</p>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                  <p>Sides: {item.sides}</p>
                  <p>Pages: {item.pages}</p>
                  <p>Schedule: {item.schedule}</p>
                  <p className="text-amber-400 font-bold">Price: {item.estimatedPrice} Rupees</p>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="mt-2 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-400 transition duration-300 ease-in-out"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Billing Summary Section */}
            <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Items ({cartRedux.length})</span>
                  <span>{totalCost} Rupees</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Service Tax (18%)</span>
                  <span>{(totalCost * 0.18).toFixed(2)} Rupees</span>
                </div>
                <div className="border-t border-gray-600 my-4"></div>
                <div className="flex justify-between text-lg font-bold text-amber-400">
                  <span>Total Amount</span>
                  <span>{(totalCost * 1.18).toFixed(2)} Rupees</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <button
                onClick={handleClearCart}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300 ease-in-out"
              >
                Clear Cart
              </button>
              {error && (
                <div className="text-red-500 mb-4">
                  {error}
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full ${
                  isProcessing 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-amber-500 hover:bg-amber-400'
                } text-gray-900 py-3 px-4 rounded-md transition duration-300 ease-in-out shadow-lg font-semibold`}
              >
                {isProcessing ? 'Processing...' : `Proceed to Payment (${(totalCost * 1.18).toFixed(2)} Rupees)`}
              </motion.button>
            </div>
          </div>
        )}
      </div>
    )
  }

  export default CartSection