import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

const Layout = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    const isAuthPage = ["/login", "/register"].includes(location.pathname);
    const isProfile = ["/profile"].includes(location.pathname);

    return (
        <div className="bg-gray-950 text-white font-sans antialiased">
            {/* Conditionally show navigation */}
            {!isAuthPage && (
                <header className="bg-gradient-to-r from-gray-900 to-gray-950/95 backdrop-blur-md shadow-2xl sticky top-0 z-50">
                    <nav className="max-w-screen-xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
                        <div className="text-2xl font-extrabold text-emerald-500 hover:text-emerald-400 transition-colors duration-300">
                            <Link to="/">CureLink</Link>
                        </div>
                        <ul className="flex items-center space-x-6">
                            {[
                                "Home",
                                "Features",
                                "How It Works",
                                "About",
                                "Contact",
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={`/#${item
                                            .toLowerCase()
                                            .replaceAll(" ", "-")}`}
                                        className="text-gray-300 hover:text-emerald-500 transition-colors duration-300 font-medium text-xs uppercase tracking-wider relative group"
                                    >
                                        {item}
                                        <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </li>
                            ))}
                            {!isProfile && !loading && (
                                <li className="flex space-x-4">
                                    {!isAuthenticated ? (
                                        <>
                                            <div>
                                                <Link
                                                    to="/login"
                                                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/30 text-xs"
                                                >
                                                    Login
                                                </Link>
                                            </div>
                                            <div>
                                                <Link
                                                    to="/register"
                                                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/30 text-xs"
                                                >
                                                    Sign Up
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        <div>
                                            <Link
                                                to="/profile"
                                                className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/30 text-xs"
                                            >
                                                Profile
                                            </Link>
                                        </div>
                                    )}
                                </li>
                            )}
                        </ul>
                    </nav>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
};

export default Layout;
