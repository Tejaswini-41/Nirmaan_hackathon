import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import OverviewSection from './OverviewSection';
import PrintersSection from './PrintersSection';
import UsersSection from './UsersSection';
// import BillingSection from './BillingSection';
import SettingsSection from './SettingsSection';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        {activeTab === 'overview' && <OverviewSection />}
        {activeTab === 'printers' && <PrintersSection />}
        {activeTab === 'users' && <UsersSection />}
        {/* {activeTab === 'billing' && <BillingSection />} */}
        {activeTab === 'settings' && <SettingsSection />}
      </main>
    </div>
  );
};

export default AdminDashboard;