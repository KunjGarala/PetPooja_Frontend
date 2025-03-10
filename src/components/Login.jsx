import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../contexts/AuthContext";
axios.defaults.withCredentials = true;

const Login = (prop) => {
    const navigate = useNavigate();
    const { checkAuth, setAuthState } = useAuth();
    if (prop.value) console.log(prop.value);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        const user = { email, password };
        if (!email || !password) {
            alert("Email and password are required.");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/auth/login",
                user,
            );

            if (res.data && res.data.payload) {
                
                setAuthState(true);

                // Redirect based on user role
                const userRole = res.data.payload.role;
                if (userRole === "doctor") {
                    navigate("/doctor-dashboard");
                } else if (userRole === "clinic_admin") {
                    navigate("/clinic-dashboard");
                } else {
                    navigate("/profile"); // Default user dashboard
                }
            } else {
                console.error("Login failed: No token or role received");
            }
        } catch (err) {
            console.error("Error:", err.response ? err.response.data : err);
        }
    };

    // Google Login Handler
    const loginWithGoogle = () => {
        window.location.href = "http://localhost:5000/api/v1/auth/googleauth";
    };

    useEffect(() => {
        const token = Cookies.get("token");
        console.log("Token from cookies:", token);
        if (token) {
            setAuthState(true);
            navigate("/profile");
        }
    }, [navigate, setAuthState]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <div className="w-full max-w-md px-6 py-8 bg-gray-800 rounded-xl shadow-2xl">
                <h2 className="text-center text-3xl font-bold tracking-tight text-gray-100">
                    Sign in to your account
                </h2>
                <form onSubmit={onSubmit} className="mt-8 space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Email Address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={onChange}
                                className="block w-full rounded-md bg-gray-700 px-3 py-2 text-base text-gray-100 border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={onChange}
                                className="block w-full rounded-md bg-gray-700 px-3 py-2 text-base text-gray-100 border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="mt-6 flex items-center justify-center">
                    <div className="w-full border-t border-gray-600"></div>
                    <span className="px-3 text-gray-400 text-sm">OR</span>
                    <div className="w-full border-t border-gray-600"></div>
                </div>

                <button
                    onClick={loginWithGoogle}
                    className="w-full flex items-center justify-center bg-gray-700 text-white font-medium py-2 px-4 rounded-md shadow-md mt-4 hover:bg-gray-600 transition-all"
                >
                    <img
                        src="/google-logo.png"
                        alt="Google logo"
                        className="h-5 w-5 mr-3"
                    />
                    Sign in with Google
                </button>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="font-semibold text-emerald-500 hover:text-emerald-400"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
