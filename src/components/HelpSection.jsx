// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaChartPie, FaBoxOpen, FaTrashAlt, FaQuestionCircle, FaRobot, FaSpinner } from 'react-icons/fa';
// import { useInventory } from '../contexts/InventoryContext';
// import axios from "axios";

// const HelpSection = () => {
//   const { inventory } = useInventory(); // Get inventory directly
//   const [aiAnalysis, setAiAnalysis] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const generateAIAnalysis = async () => {
//     setIsLoading(true);
//     console.log(inventory);
    
//     try {
//       // Create inventory summary including quantities
//       const stockSummary = inventory
//         .map(item => `${item.name}: ${item.quantity} units`)
//         .join('\n');

//       const prompt = `Based on my current kitchen inventory:\n${stockSummary}\nWhat dishes can I make? Please suggest only dish names in a simple list format.`;

//       // const response = await axios({
//       //   url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAHTdu2FFqlJ4cxBp2ifOUC3x4zHSNXvlY`,
//       //   // credentials: true, 
//       //   method: "post",
//       //   data: {
//       //     contents: [{ parts: [{ text: prompt }] }],
//       //   },
//       // });
//       const response = await axios({
//         url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAHTdu2FFqlJ4cxBp2ifOUC3x4zHSNXvlY`,
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         data: {
//           contents: [{ parts: [{ text: prompt }] }],
//         },
//       });
      
//       console.log(response);
      
//       console.log(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
//       setAiAnalysis(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
//     } catch (error) {
//       console.error(error);
//       setAiAnalysis('Unable to generate analysis at the moment. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const features = [
//     {
//       icon: <FaChartPie className="w-8 h-8" />,
//       title: "Stock Management",
//       description: "View and monitor your inventory levels with interactive charts and detailed statistics. Track stock movements and get insights into your inventory patterns.",
//       color: "from-sky-600 to-sky-400"
//     },
//     {
//       icon: <FaBoxOpen className="w-8 h-8" />,
//       title: "Add Product",
//       description: "Add new products to your inventory with details like name, quantity, and unit measurements. Upload product images and manage product information easily.",
//       color: "from-emerald-600 to-emerald-400"
//     },
//     {
//       icon: <FaTrashAlt className="w-8 h-8" />,
//       title: "Remove Product",
//       description: "Remove products from your inventory with a simple click. Includes search and filter capabilities to quickly find and manage products.",
//       color: "from-rose-600 to-rose-400"
//     }
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="max-w-4xl mx-auto text-sky-100"
//     >
//       {/* Header */}
//       <div className="text-center mb-12">
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", duration: 0.5 }}
//           className="w-16 h-16 bg-sky-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
//         >
//           <FaQuestionCircle className="w-8 h-8 text-sky-400" />
//         </motion.div>
//         <h2 className="text-3xl font-bold text-sky-300 mb-4">Kitchen Inventory Manager</h2>
//         <p className="text-sky-200 max-w-2xl mx-auto">
//           Your comprehensive solution for managing kitchen inventory efficiently and effectively.
//         </p>
//       </div>

//       {/* AI Analysis Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-12 bg-sky-900/20 p-6 rounded-xl border border-sky-800/30"
//       >
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-indigo-900/30 rounded-lg">
//               <FaRobot className="w-6 h-6 text-indigo-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-sky-300">AI Stock Analysis</h3>
//           </div>
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={generateAIAnalysis}
//             disabled={isLoading}
//             className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white flex items-center space-x-2 disabled:opacity-50"
//           >
//             {isLoading ? (
//               <>
//                 <FaSpinner className="w-5 h-5 animate-spin" />
//                 <span>Analyzing...</span>
//               </>
//             ) : (
//               <>
//                 <FaRobot className="w-5 h-5" />
//                 <span>Analyze Stock</span>
//               </>
//             )}
//           </motion.button>
//         </div>
        
//         {aiAnalysis && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-sky-900/10 rounded-lg p-4 border border-sky-800/20"
//           >
//             <pre className="whitespace-pre-wrap text-sky-200 text-sm">
//               {aiAnalysis}
//             </pre>
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Features Grid */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {features.map((feature, index) => (
//           <motion.div
//             key={feature.title}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.2 }}
//             className="bg-sky-900/20 p-6 rounded-xl border border-sky-800/30 hover:bg-sky-900/30 transition-all duration-300"
//           >
//             <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
//               {feature.icon}
//             </div>
//             <h3 className="text-xl font-semibold mb-3 text-sky-300">{feature.title}</h3>
//             <p className="text-sky-200 text-sm leading-relaxed">{feature.description}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Quick Tips */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6 }}
//         className="mt-12 bg-sky-900/20 p-6 rounded-xl border border-sky-800/30"
//       >
//         <h3 className="text-xl font-semibold mb-4 text-sky-300">Quick Tips</h3>
//         <ul className="space-y-3 text-sky-200">
//           <li className="flex items-center">
//             <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
//             Use the sidebar navigation to switch between different features
//           </li>
//           <li className="flex items-center">
//             <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
//             Monitor stock levels regularly to maintain optimal inventory
//           </li>
//           <li className="flex items-center">
//             <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
//             Use the search function to quickly find specific products
//           </li>
//         </ul>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default HelpSection;