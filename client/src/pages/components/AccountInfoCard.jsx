import React from "react";
import { motion } from "framer-motion";

const AccountInfoCard = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Account Information</h2>
      <div className="space-y-2">
        <p>
          <span className="text-gray-400">Name:</span> {user.name}
        </p>
        <p>
          <span className="text-gray-400">Student ID:</span> {user.studentId || 22210270}
        </p>
        <p>
          <span className="text-gray-400">Email:</span> {user.email}
        </p>
        <p>
          <span className="text-gray-400">Print Credits:</span> <span className="text-amber-400 font-bold">{user.printCredits}</span>
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 bg-amber-500 text-gray-900 py-2 px-4 rounded-md hover:bg-amber-400 transition duration-300 ease-in-out shadow-lg font-semibold"
      >
        Add Credits
      </motion.button>
    </div>
  );
};

export default AccountInfoCard;