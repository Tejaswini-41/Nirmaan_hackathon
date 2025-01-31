import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const UsersSection = () => {
  const [printJobs, setPrintJobs] = useState([]);

  useEffect(() => {
    const fetchPrintJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/print-jobs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPrintJobs(data);
      } catch (error) {
        console.error('Error fetching print jobs:', error);
      }
    };

    fetchPrintJobs();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2 border border-gray-700">User Name</th>
            <th className="p-2 border border-gray-700">Email</th>
            <th className="p-2 border border-gray-700">Print ID</th>
            <th className="p-2 border border-gray-700">Transaction Status</th>
            <th className="p-2 border border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {printJobs.map((job) => (
            <tr key={job.printId}>
              <td className="p-2 border border-gray-700">{job.userId.name}</td>
              <td className="p-2 border border-gray-700">{job.userId.email}</td>
              <td className="p-2 border border-gray-700">{job.printId}</td>
              <td className="p-2 border border-gray-700">{job.transactionStatus ? 'Completed' : 'Pending'}</td>
              <td className="p-2 border border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-amber-400 hover:text-amber-300 mr-2"
                  onClick={() => window.location.href = `/admin/view-document/${job.printId}`}
                >
                  View Document
                </motion.button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 bg-amber-500 text-gray-900 py-2 px-4 rounded-md hover:bg-amber-400 transition duration-300 ease-in-out shadow-lg font-semibold"
      >
        Add New User
      </motion.button>
    </div>
  );
};

export default UsersSection;