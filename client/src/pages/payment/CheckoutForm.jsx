import React from 'react';
// import { CardContext } from "../components/CardContext";


const CheckoutForm = ({ handlePaymentSuccess }) => {
  const { cart, setCart } = useContext(CartContext);
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag', // Replace with your Razorpay test key
      amount: 5, // Amount in paise (50000 paise = 500 INR)
      currency: 'INR',
      name: 'VIIT - CC',
      description: 'Test Transaction',
      handler: async function (response) {
        console.log(response);
              // Update transaction status in the backend
              for (const item of cart) {
                await fetch(`http://localhost:5000/api/print/${item.printId}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ transactionStatus: true }),
                });
              }
        handlePaymentSuccess();
      },
      prefill: {
        name: 'Tejaswini Durge',
        email: 'tejaswinidurge41@gmaile.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#F37254',
      },
    };



    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };


  return (
    <button
      onClick={handlePayment}
      className="mt-4 w-full bg-green-500 text-gray-900 py-2 px-4 rounded-md hover:bg-green-400 transition duration-300 ease-in-out shadow-lg font-semibold"
    >
      Pay with Razorpay
    </button>
  );
};

export default CheckoutForm;