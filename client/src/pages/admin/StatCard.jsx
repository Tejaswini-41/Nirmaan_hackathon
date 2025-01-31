import React from 'react';

const StatCard = ({ title, value }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
    <h3 className="text-gray-400 text-sm">{title}</h3>
    <p className="text-2xl font-bold text-amber-400">{value}</p>
  </div>
);

export default StatCard;