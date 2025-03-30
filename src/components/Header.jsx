import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    const isAuthPage = ["/login", "/register"].includes(location.pathname);
    const isProfile = ["/profile"].includes(location.pathname);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div className="bg-gray-950 text-white font-sans antialiased">
            {!isAuthPage && (
                <motion.header
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 ${
                        isScrolled 
                            ? 'backdrop-blur-lg bg-gray-900/80 shadow-lg shadow-purple-500/5'
                            : 'backdrop-blur-md bg-gray-900/20'
                    } border-b border-gray-800/30`}
                >
                    <nav className="max-w-7xl mx-auto px-6 h-full">
                        <div className="flex items-center justify-between h-full">
                            {/* Brand Name */}
                            <Link to="/" className="flex-shrink-0 group">
                                <motion.h1 
                                    whileHover={{ scale: 1.05 }}
                                    className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent font-poppins"
                                >
                                    SmartBites
                                </motion.h1>
                            </Link>

                            {/* Desktop Navigation */}
                            <ul className="hidden md:flex space-x-8">
                                {["Dashboard", "Inventory", "Analysis", "Profile","RecipeAssistant"].map((item, index) => (
                                    <motion.li 
                                        key={index}
                                        whileHover={{ y: -2 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Link
                                            to={`/${item.toLowerCase()}`}
                                            className="relative text-gray-300 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider group font-medium"
                                        >
                                            {item}
                                            <span className="absolute bottom-[-3px] left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Auth Buttons */}
                            {!isProfile && !loading && (
                                <div className="hidden md:flex space-x-4">
                                    {!isAuthenticated ? (
                                        <>
                                            <motion.div whileHover={{ scale: 1.05 }}>
                                                <Link
                                                    to="/login"
                                                    className="bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-2.5 rounded-full text-white hover:opacity-90 transition-all text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 font-medium"
                                                >
                                                    Login
                                                </Link>
                                            </motion.div>
                                            <motion.div whileHover={{ scale: 1.05 }}>
                                                <Link
                                                    to="/register"
                                                    className="bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-2.5 rounded-full text-white hover:opacity-90 transition-all text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 font-medium"
                                                >
                                                    Sign Up
                                                </Link>
                                            </motion.div>
                                        </>
                                    ) : (
                                        <motion.div whileHover={{ scale: 1.05 }}>
                                            <Link
                                                to="/dashboard"
                                                className="bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-2.5 rounded-full text-white hover:opacity-90 transition-all text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 font-medium"
                                            >
                                                Dashboard
                                            </Link>
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button 
                                className="md:hidden p-2 rounded-lg hover:bg-gray-800/50"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                            </button>
                        </div>

                        {/* Mobile Menu - Positioned absolutely */}
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute left-0 right-0 top-16 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800/30 md:hidden"
                            >
                                <div className="max-w-7xl mx-auto px-6 py-4">
                                    <ul className="space-y-4">
                                        {["Dashboard", "Inventory", "Analysis", "Profile"].map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    to={`/${item.toLowerCase()}`}
                                                    className="block text-gray-300 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </nav>
                </motion.header>
            )}
        </div>
    );
};

export default Header;