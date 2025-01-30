import React from "react";
import { useLocation } from "react-router-dom";

const CartPage = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">{item.document}</h3>
              <p>Printer: {item.printer}</p>
              <p>Copies: {item.copies}</p>
              <p>Size: {item.size}</p>
              <p>Color: {item.color}</p>
              <p>Sides: {item.sides}</p>
              <p>Pages: {item.pages}</p>
              <p>Schedule: {item.schedule}</p>
              <p className="text-amber-400 font-bold">Price: {item.price} credits</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;