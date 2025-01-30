import React from 'react';
import { loadRazorpay } from 'razorpay';

const RazorpayProvider = ({ children }) => {
  const razorpay = loadRazorpay('rzp_test_1DP5mmOlF5G5ag'); // Replace with your Razorpay key

  return (
    <RazorpayContext.Provider value={razorpay}>
      {children}
    </RazorpayContext.Provider>
  );
};

export const RazorpayContext = React.createContext();

export default RazorpayProvider;