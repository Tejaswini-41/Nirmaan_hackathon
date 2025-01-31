import React from 'react';
import { motion } from 'framer-motion';

const PrintersSection = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Manage Printers</h2>
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-800">
          <th className="p-2 border border-gray-700">Printer Name</th>
          <th className="p-2 border border-gray-700">Location</th>
          <th className="p-2 border border-gray-700">Status</th>
          <th className="p-2 border border-gray-700">Queue</th>
          <th className="p-2 border border-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 border border-gray-700">Library Printer</td>
          <td className="p-2 border border-gray-700">Main Library</td>
          <td className="p-2 border border-gray-700">Active</td>
          <td className="p-2 border border-gray-700">5 jobs</td>
          <td className="p-2 border border-gray-700">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-amber-400 hover:text-amber-300 mr-2"
            >
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-red-400 hover:text-red-300"
            >
              Disable
            </motion.button>
          </td>
        </tr>
        {/* Add more printer rows as needed */}
      </tbody>
    </table>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-4 bg-amber-500 text-gray-900 py-2 px-4 rounded-md hover:bg-amber-400 transition duration-300 ease-in-out shadow-lg font-semibold"
    >
      Add New Printer
    </motion.button>
  </div>
);

export default PrintersSection;