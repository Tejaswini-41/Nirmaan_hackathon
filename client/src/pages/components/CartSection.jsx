import React, { useContext } from "react";
import { motion } from "framer-motion";
import { CartContext } from "./CartContext"; // Import the CartContext
import CheckoutForm from "../payment/CheckoutForm"; // Import the CheckoutForm

const CartSection = () => {
  const { cart, setCart } = useContext(CartContext); // Use the CartContext

  const handlePaymentSuccess = () => {
    console.log("Payment processed");
    // After payment, clear the cart and move items to order history
    setCart([]);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">{item.document}</h3>
                <p>Copies: {item.copies}</p>
                <p>Size: {item.size}</p>
                <p>Color: {item.color}</p>
                <p>Sides: {item.sides}</p>
                <p>Pages: {item.pages}</p>
                <p>Schedule: {item.schedule}</p>
                <p className="text-amber-400 font-bold">Price: {item.price} RS</p>
              </li>
            ))}
          </ul>
          <CheckoutForm handlePaymentSuccess={handlePaymentSuccess} />
        </div>
      )}
    </div>
  );
};

export default CartSection;