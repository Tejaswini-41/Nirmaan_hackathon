import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import DashboardOverview from "./components/DashboardOverview";
import NewPrintSection from "./components/NewPrintSection";
import CartSection from "./components/CartSection";
import OrderHistorySection from "./components/OrderHistorySection";
import CloudStorageSection from "./components/CloudStorageSection";
import SettingsSection from "./components/SettingsSection";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          console.log("User data fetched successfully:", data);
          setUser(data);
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user ? user.name : "Loading..."}</h1>
        {activeTab === "dashboard" && <DashboardOverview user={user} />}
        {activeTab === "newPrint" && <NewPrintSection />}
        {activeTab === "cart" && <CartSection />}
        {activeTab === "orderHistory" && <OrderHistorySection />}
        {activeTab === "cloudStorage" && <CloudStorageSection />}
        {activeTab === "settings" && <SettingsSection />}
      </main>
    </div>
  );
};

export default StudentDashboard;