import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import axios from 'axios';

const AnalysisPage = () => {
  // Sample data - replace with your API data
  const [inventoryData, setInventoryData] = useState([
    { name: 'Tomatoes', used: 120, wasted: 20, category: 'Vegetables' },
    { name: 'Lettuce', used: 80, wasted: 15, category: 'Vegetables' },
    { name: 'Chicken', used: 60, wasted: 10, category: 'Meat' },
    { name: 'Onions', used: 90, wasted: 25, category: 'Vegetables' },
    { name: 'Cheese', used: 50, wasted: 5, category: 'Dairy' },
  ]);

  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('week');

  // Colors for charts
  const COLORS = ['#10B981', '#EF4444', '#3B82F6', '#F59E0B', '#8B5CF6'];

  // Calculate totals
  const totalUsed = inventoryData.reduce((sum, item) => sum + item.used, 0);
  const totalWasted = inventoryData.reduce((sum, item) => sum + item.wasted, 0);
  const totalInventory = totalUsed + totalWasted;
  const wastePercentage = totalInventory > 0 ? 
    ((totalWasted / totalInventory) * 100).toFixed(1) : 0;

  // Format data for pie chart (percentage based)
  const pieData = inventoryData.map(item => ({
    name: item.name,
    value: item.used + item.wasted,
    used: item.used,
    wasted: item.wasted
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Inventory Analysis</h1>

      {/* Time Range Selector */}
      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setTimeRange('week')}
          className={`px-4 py-2 rounded-lg ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Weekly
        </button>
        <button 
          onClick={() => setTimeRange('month')}
          className={`px-4 py-2 rounded-lg ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Monthly
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-gray-500 text-sm mb-1">Total Inventory</h3>
          <p className="text-2xl font-bold text-gray-800">{totalInventory} units</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-gray-500 text-sm mb-1">Productively Used</h3>
          <p className="text-2xl font-bold text-green-600">{totalUsed} units</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-gray-500 text-sm mb-1">Total Wasted</h3>
          <p className="text-2xl font-bold text-red-600">{totalWasted} units ({wastePercentage}%)</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Pie Chart - Shows percentage distribution */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Inventory Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => {
                    const { payload } = props;
                    return [
                      `Used: ${payload.used} units`,
                      `Wasted: ${payload.wasted} units`,
                      `Total: ${value} units`
                    ];
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart - Shows absolute values */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Usage vs Waste</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={inventoryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="used" name="Used" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="wasted" name="Wasted" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Detailed Inventory</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wasted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste %</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventoryData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{item.used}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{item.wasted}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                  {((item.wasted / (item.used + item.wasted)) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalysisPage;