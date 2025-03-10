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

            // localStorage.setItem("token", res.data.payload);
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
            <div className="w-full max-w-md px-8 py-10 bg-gray-800 rounded-xl shadow-lg">
                <h2 className="text-center text-3xl font-bold text-gray-100">Create a New Account</h2>

                <form onSubmit={onSubmit} className="mt-6 space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={name}
                            onChange={onChange}
                            className="mt-2 w-full rounded-md bg-gray-700 px-4 py-2 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={onChange}
                            className="mt-2 w-full rounded-md bg-gray-700 px-4 py-2 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={onChange}
                            className="mt-2 w-full rounded-md bg-gray-700 px-4 py-2 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-300 hover:from-emerald-600 hover:to-emerald-500"
                    >
                        Register
                    </button>

                    <div className="relative flex items-center my-4">
                        <div className="flex-grow border-t border-gray-600"></div>
                        <span className="px-3 text-gray-400 text-sm">or</span>
                        <div className="flex-grow border-t border-gray-600"></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignup}
                        className="w-full flex items-center justify-center bg-gray-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition-colors duration-300 hover:bg-gray-600"
                    >
                        <img src="/google-logo.png" alt="Google logo" className="h-5 w-5 mr-3" />
                        Sign up with Google
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <a href="/login" className="font-semibold text-emerald-500 hover:text-emerald-400 transition-colors duration-300">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
