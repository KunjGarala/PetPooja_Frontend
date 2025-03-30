import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

const Layout = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    const isAuthPage = ["/login", "/register"].includes(location.pathname);
    const isProfile = ["/profile"].includes(location.pathname);

    // Enhanced smooth scroll with offset
    const scrollWithOffset = (el) => {
        const yOffset = -80; // Adjust for navbar height
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-950 text-white font-sans antialiased">
            {/* Transparent Navbar */}
            {!isAuthPage && (
                <header className="fixed w-full z-50 backdrop-blur-md bg-gray-900/20 border-b border-gray-800/30">
                    <nav className="max-w-7xl mx-auto px-6 py-5">
                        <div className="flex items-center justify-between">
                            {/* Brand Name */}
                            <Link 
                                to="/" 
                                className="flex-shrink-0 hover:scale-105 transition-transform duration-300"
                            >
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent font-[Poppins]">
                                SmartBites
                                </h1>
                            </Link>

                            {/* Navigation Links */}
                            <ul className="hidden md:flex space-x-8">
                                {["Home", "Features", "How It Works", "About", "Contact"].map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            to={`/#${item.toLowerCase().replaceAll(" ", "-")}`}
                                            scroll={el => scrollWithOffset(el)}
                                            className="relative text-gray-300 hover:text-white transition-colors duration-300 text-base uppercase tracking-wider group font-[Inter]"
                                        >
                                            {item}
                                            <span className="absolute bottom-[-3px] left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Enhanced Auth Buttons */}
                            {!isProfile && !loading && (
                                <div className="flex space-x-4">
                                    {!isAuthenticated ? (
                                        <>
                                            <Link
                                                to="/login"
                                                className="bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 rounded-full text-white hover:opacity-90 hover:scale-105 transition-all text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 font-medium"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to="/register"
                                                className="bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 rounded-full text-white hover:opacity-90 hover:scale-105 transition-all text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 font-medium"
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    ) : (
                                        <Link
                                            to="/dashboard"
                                            className="bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 rounded-full text-white hover:opacity-90 hover:scale-105 transition-all text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 font-medium"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </nav>
                </header>
            )}

            {/* Main Content with Scroll Padding */}
            <main className={!isAuthPage ? "pt-20 scroll-mt-20" : ""}>
                {children}
            </main>
        </div>
    );
};

export default Layout;