import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <header className="bg-gray-800 py-4 px-6 flex justify-between items-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaf6-sDpgArQz0rfE__xtbQIT09llY_Wp8nA&s" alt="Campus Printing Hub Logo" className="h-15 w-11" />
        <nav className="space-x-4">
          <Link to="/login" className="text-amber-400 hover:text-amber-300 transition-colors">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-amber-500 text-gray-900 px-4 py-2 rounded-full hover:bg-amber-400 transition-colors"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-amber-400 mb-4">Campus Printing Hub</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">Effortless printing for your academic journey</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <FeatureCard
            icon="🖨️"
            title="AI-Powered Printing"
            description="Smart suggestions for eco-friendly and cost-effective printing"
          />
          <FeatureCard
            icon="🗓️"
            title="Flexible Scheduling"
            description="Book your prints in advance and pick up at your convenience"
          />
          <FeatureCard
            icon="💳"
            title="Easy Payments"
            description="Seamless integration with campus card and online options"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative rounded-lg overflow-hidden shadow-2xl"
        >
          <img
            src="https://files.yappe.in/place/full/viit-college-9682621.webp"
            alt="Campus at Night"
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">24/7 Printing Access</h2>
            <p className="text-gray-200 mb-4">
              Experience the future of campus printing - available anytime, anywhere.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center bg-amber-500 text-gray-900 px-6 py-3 rounded-full hover:bg-amber-400 transition-colors"
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 Campus Printing Hub. All rights reserved.</p>
          <nav className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/about" className="hover:text-amber-400 transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-amber-400 transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-amber-400 mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
)

export default HomePage

