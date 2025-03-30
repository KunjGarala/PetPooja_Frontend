import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { FaBoxes, FaChartPie, FaChartBar, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { utils as XLSXUtils, write as XLSXWrite } from 'xlsx';

ChartJS.register(
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalysisPage = () => {
  // Sample data - replace with your API data
  const [inventoryData, setInventoryData] = useState([
    { name: 'Tomatoes', used: 120, wasted: 20, category: 'Vegetables' },
    { name: 'Lettuce', used: 80, wasted: 15, category: 'Vegetables' },
    { name: 'Chicken', used: 60, wasted: 10, category: 'Meat' },
    { name: 'Onions', used: 90, wasted: 25, category: 'Vegetables' },
    // { name: 'Cheese', used: 50, wasted: 5, category: 'Dairy' },
  ]);

  const chartData = {
    labels: inventoryData.map(p => p.name),
    datasets: [{
      data: inventoryData.map(p => p.used + p.wasted),
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)', // green
        'rgba(239, 68, 68, 0.8)',  // red
        'rgba(59, 130, 246, 0.8)', // blue
        'rgba(245, 158, 11, 0.8)', // yellow
        'rgba(139, 92, 246, 0.8)'  // purple
      ].slice(0, inventoryData.length),
      borderColor: [
        'rgba(16, 185, 129, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(139, 92, 246, 1)'
      ].slice(0, inventoryData.length),
      borderWidth: 1,
    }]
  };

  const barData = {
    labels: inventoryData.map(p => p.name),
    datasets: [
      {
        label: 'Used',
        data: inventoryData.map(p => p.used),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Wasted',
        data: inventoryData.map(p => p.wasted),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true, // Makes legend items circular
          pointStyle: 'circle', // Ensures circle shape
          padding: 15,
          boxWidth: 8, // Smaller circle size
          boxHeight: 8, // Smaller circle size
          font: {
            size: 11,
            family: "'Inter', sans-serif"
          },
          color: '#D1D5DB'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)', // Dark background
        titleColor: '#F3F4F6',
        bodyColor: '#D1D5DB',
        padding: 10,
        cornerRadius: 8, // Rounded corners
        displayColors: true, // Show color boxes
        boxWidth: 8, // Size of color box in tooltip
        boxHeight: 8,
        usePointStyle: true, // Makes tooltip color boxes circular
        titleFont: {
          size: 12,
          family: "'Inter', sans-serif",
          weight: '600'
        },
        bodyFont: {
          size: 11,
          family: "'Inter', sans-serif"
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.y?.toLocaleString() || context.parsed?.toLocaleString() || '';
            return label;
          }
        }
      },
      datalabels: {
        display: false // Disable data labels for cleaner look
      }
    },
    elements: {
      arc: {
        borderWidth: 2, // Thinner borders for pie chart
        borderRadius: 4 // Rounded corners on pie segments
      },
      bar: {
        borderRadius: 6, // Rounded corners on bars
        borderSkipped: false // Show all corners rounded
      }
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10
      }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

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

  const downloadExcel = () => {
    // Prepare the data for Excel
    const excelData = inventoryData.map(item => ({
      'Item Name': item.name,
      'Category': item.category,
      'Units Used': item.used,
      'Units Wasted': item.wasted,
      'Total Units': item.used + item.wasted,
      'Waste Percentage': ((item.wasted / (item.used + item.wasted)) * 100).toFixed(1) + '%'
    }));

    // Create worksheet
    const worksheet = XLSXUtils.json_to_sheet(excelData);

    // Style the header row (make it bold)
    const range = XLSXUtils.decode_range(worksheet['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSXUtils.encode_cell({ r: 0, c: C });
      if (!worksheet[address]) continue;
      worksheet[address].s = { font: { bold: true } };
    }

    // Set column widths
    const columnWidths = [
      { wch: 15 }, 
      { wch: 12 }, 
      { wch: 12 }, 
      { wch: 12 }, 
      { wch: 12 }, 
      { wch: 15 }, 
    ];
    worksheet['!cols'] = columnWidths;

    const workbook = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(workbook, worksheet, 'Inventory Data');

    // Generate Excel file
    const excelBuffer = XLSXWrite(workbook, { bookType: 'xlsx', type: 'array' });
    const date = new Date().toISOString().split('T')[0];
    const fileName = `inventory_report_${date}.xlsx`;

    // Download file
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-100 mb-2">Inventory Analysis</h1>
        <p className="text-gray-400">Track and analyze your inventory usage and waste</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex space-x-4 mb-8 bg-gray-800 p-2 rounded-lg shadow-sm inline-block">
        {['day', 'week', 'month', 'year'].map((range) => (
          <button 
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-6 py-2 rounded-md transition-all duration-200 ${
              timeRange === range 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Total Inventory</h3>
          <p className="text-3xl font-bold text-gray-100">{totalInventory.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">Total units in system</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Productively Used</h3>
          <p className="text-3xl font-bold text-green-400">{totalUsed.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">Units used effectively</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Total Wasted</h3>
          <p className="text-3xl font-bold text-red-400">
            {totalWasted.toLocaleString()}
            <span className="text-lg ml-2">({wastePercentage}%)</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">Units lost to waste</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700"
          style={{ height: '400px' }}  // Increased from 300px
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-900/50 rounded-lg">
              <FaChartPie className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-100">Inventory Distribution</h3>
          </div>
          <div className="h-[300px]">  {/* Increased from 200px */}
            {loading ? (
              <div className="animate-pulse flex justify-center items-center h-full bg-gray-700/50 rounded-lg">
                <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <Pie data={chartData} options={{
                ...chartOptions,
                radius: '85%', // Slightly larger pie
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    ...chartOptions.plugins.legend,
                    position: 'bottom',
                    align: 'center',
                    labels: {
                      ...chartOptions.plugins.legend.labels,
                      padding: 20, // Increased padding
                      font: {
                        size: 12, // Slightly larger font
                        family: "'Inter', sans-serif"
                      }
                    }
                  }
                }
              }} />
            )}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700"
          style={{ height: '400px' }}  // Increased from 300px
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-900/50 rounded-lg">
              <FaChartBar className="h-5 w-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-100">Usage vs Waste</h3>
          </div>
          <div className="h-[300px]">  {/* Increased from 200px */}
            {loading ? (
              <div className="animate-pulse flex justify-center items-center h-full bg-gray-700/50 rounded-lg">
                <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <Bar data={barData} options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    ...chartOptions.plugins.legend,
                    position: 'bottom',
                    align: 'center',
                    labels: {
                      ...chartOptions.plugins.legend.labels,
                      padding: 20, // Increased padding
                      font: {
                        size: 12, // Slightly larger font
                        family: "'Inter', sans-serif"
                      }
                    }
                  }
                }
              }} />
            )}
          </div>
        </motion.div>
      </div>

      {/* Table Section */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
            Detailed Inventory
          </h2>
          <button
            onClick={downloadExcel}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 
              transition-colors duration-200 rounded-lg text-white text-sm font-medium"
          >
            <FaDownload className="h-4 w-4" />
            <span>Download Excel</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-700/50">Item</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-700/50">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-700/50">Used</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-700/50">Wasted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {inventoryData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-700">{item.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="text-green-400 font-medium">{item.used.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="text-red-400 font-medium">{item.wasted.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;