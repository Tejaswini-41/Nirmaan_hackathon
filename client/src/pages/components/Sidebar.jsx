import React from "react";
import { motion } from "framer-motion";
import { User, Printer, Clock, FileText, Cloud, Settings, LogOut, ShoppingCart, History } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "dashboard", icon: User, label: "Dashboard" },
    { id: "newPrint", icon: Printer, label: "New Print" },
    { id: "cart", icon: ShoppingCart, label: "Cart" },
    { id: "orderHistory", icon: History, label: "Order History" },
    { id: "cloudStorage", icon: Cloud, label: "Cloud Storage" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-gray-800 p-4">
      <div className="mb-8">
        <img
          src="/placeholder.svg?height=50&width=50"
          alt="Campus Printing Hub Logo"
          className="h-12 w-12 mx-auto mb-2"
        />
        <h2 className="text-xl font-bold text-center text-amber-400">Campus Printing Hub</h2>
      </div>
      <nav>
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center p-2 rounded-md mb-2 ${
              activeTab === item.id ? "bg-amber-500 text-gray-900" : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <item.icon className="mr-2 h-5 w-5" />
            {item.label}
          </motion.button>
        ))}
      </nav>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full flex items-center p-2 rounded-md mt-8 text-gray-300 hover:bg-gray-700"
      >
        <LogOut className="mr-2 h-5 w-5" />
        Logout
      </motion.button>
    </aside>
  );
};

export default Sidebar;