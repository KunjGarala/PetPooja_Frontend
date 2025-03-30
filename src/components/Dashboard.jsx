// pages/Dashboard.jsx
export default function Dashboard() {
    return (
      <div className="min-h-screen bg-dashboard-gradient">
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">
              Inventory Health
            </h3>
            {/* Content */}
          </div>
  
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">
              Waste Prediction
            </h3>
            {/* Content */}
          </div>
  
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-pink-400">
              Menu Suggestions
            </h3>
            {/* Content */}
          </div>
        </div>
      </div>
    )
  }