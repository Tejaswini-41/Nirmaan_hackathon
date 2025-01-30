import { useState } from "react"
import { motion } from "framer-motion"
import { Printer, Users, CreditCard, Settings, BarChart, LogOut } from "lucide-react"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const menuItems = [
    { id: "overview", icon: BarChart, label: "Overview" },
    { id: "printers", icon: Printer, label: "Manage Printers" },
    { id: "users", icon: Users, label: "User Management" },
    { id: "billing", icon: CreditCard, label: "Billing" },
    { id: "settings", icon: Settings, label: "System Settings" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4">
        <div className="mb-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaf6-sDpgArQz0rfE__xtbQIT09llY_Wp8nA&s"
            alt="Campus Printing Hub Logo"
            className="h-12 w-12 mx-auto mb-2"
          />
          <h2 className="text-xl font-bold text-center text-amber-400">Admin Dashboard</h2>
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, Admin!</h1>
        {activeTab === "overview" && <OverviewSection />}
        {activeTab === "printers" && <PrintersSection />}
        {activeTab === "users" && <UsersSection />}
        {activeTab === "billing" && <BillingSection />}
        {activeTab === "settings" && <SettingsSection />}
      </main>
    </div>
  )
}

const OverviewSection = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">System Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Users" value="1,234" />
      <StatCard title="Active Printers" value="15" />
      <StatCard title="Print Jobs Today" value="89" />
      <StatCard title="Revenue This Month" value="$3,456" />
    </div>
  </div>
)

const StatCard = ({ title, value }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
    <h3 className="text-gray-400 text-sm">{title}</h3>
    <p className="text-2xl font-bold text-amber-400">{value}</p>
  </div>
)

const PrintersSection = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Manage Printers</h2>
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-800">
          <th className="p-2 border border-gray-700">Printer Name</th>
          <th className="p-2 border border-gray-700">Location</th>
          <th className="p-2 border border-gray-700">Status</th>
          <th className="p-2 border border-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 border border-gray-700">Library Printer</td>
          <td className="p-2 border border-gray-700">Main Library</td>
          <td className="p-2 border border-gray-700">Active</td>
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
)

const UsersSection = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">User Management</h2>
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-800">
          <th className="p-2 border border-gray-700">Name</th>
          <th className="p-2 border border-gray-700">Email</th>
          <th className="p-2 border border-gray-700">Role</th>
          <th className="p-2 border border-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 border border-gray-700">John Doe</td>
          <td className="p-2 border border-gray-700">john@example.com</td>
          <td className="p-2 border border-gray-700">Student</td>
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
              Deactivate
            </motion.button>
          </td>
        </tr>
        {/* Add more user rows as needed */}
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
)

const BillingSection = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Billing Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <StatCard title="Total Revenue" value="$12,345" />
      <StatCard title="Pending Payments" value="$678" />
    </div>
    <h3 className="text-xl font-semibold mb-2">Recent Transactions</h3>
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-800">
          <th className="p-2 border border-gray-700">Date</th>
          <th className="p-2 border border-gray-700">User</th>
          <th className="p-2 border border-gray-700">Amount</th>
          <th className="p-2 border border-gray-700">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 border border-gray-700">2025-01-30</td>
          <td className="p-2 border border-gray-700">Jane Smith</td>
          <td className="p-2 border border-gray-700">$5.00</td>
          <td className="p-2 border border-gray-700">Completed</td>
        </tr>
        {/* Add more transaction rows as needed */}
      </tbody>
    </table>
  </div>
)

const SettingsSection = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">System Settings</h2>
    <form className="space-y-4">
      <div>
        <label htmlFor="price-per-page" className="block text-sm font-medium text-gray-300 mb-2">
          Price Per Page
        </label>
        <input
          type="number"
          id="price-per-page"
          step="0.01"
          defaultValue="0.10"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="max-daily-prints" className="block text-sm font-medium text-gray-300 mb-2">
          Max Daily Prints Per User
        </label>
        <input
          type="number"
          id="max-daily-prints"
          defaultValue="100"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-amber-500 text-gray-900 py-2 px-4 rounded-md hover:bg-amber-400 transition duration-300 ease-in-out shadow-lg font-semibold"
      >
        Save Settings
      </motion.button>
    </form>
  </div>
)

export default AdminDashboard

