import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        const newUser = { username: name, email, password };

        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/auth/register",
                newUser,
                {
                    withCredentials: true,
                }
            );
            navigate("/profile");
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const handleGoogleSignup = () => {
        window.location.href = "http://localhost:5000/api/v1/auth/googleauth";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <div className="w-full max-w-md px-8 py-10 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg">
                <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                    Create Account
                </h2>
                <p className="text-center text-gray-400 mb-6">Join PetPooja AI Kitchen</p>

                <form onSubmit={onSubmit} className="mt-6 space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={name}
                            onChange={onChange}
                            className="mt-1 w-full rounded-lg bg-gray-700/50 px-4 py-3 text-gray-100 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={onChange}
                            className="mt-1 w-full rounded-lg bg-gray-700/50 px-4 py-3 text-gray-100 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={onChange}
                            className="mt-1 w-full rounded-lg bg-gray-700/50 px-4 py-3 text-gray-100 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-purple-500/20 hover:from-purple-700 hover:to-cyan-600 transition-all duration-300"
                    >
                        Register Now
                    </button>

                    <div className="relative flex items-center my-5">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="px-3 text-gray-500 text-sm">OR CONTINUE WITH</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignup}
                        className="w-full flex items-center justify-center gap-3 bg-gray-700/50 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg border border-gray-600 transition-all duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Sign up with Google
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <a 
                        href="/login" 
                        className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;