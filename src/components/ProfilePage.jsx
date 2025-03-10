import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirect
import { useAuth } from "../contexts/AuthContext";
axios.defaults.withCredentials = true;
import EditForm from "./EditForm";

// Add setAuthState to the destructured imports
const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const { setAuthState } = useAuth();

    const handleSaveProfile = async (updatedData) => {
        try {
            const { data } = await axios.put(
                "http://localhost:5000/api/v1/user/profile",
                updatedData
            );
            setUser(data);
        } catch (error) {
            console.error("Error updating profile:", error);
            throw new Error("Failed to update profile");
        }
    };

    // Fetch user profile information
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/api/v1/user/profile"
                );
                setUser(data);
            } catch (error) {
                setError("Failed to load profile. Please try again.");
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Logout function: Calls the backend logout route
    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:5000/api/v1/auth/logout");
            setAuthState(false);
            console.log("Logged out and setAuthState(false) called");
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
            setError("Failed to log out. Please try again.");
        }
    };

    // Simulating components to show on profile page
    const components = [
        {
            label: "View My Prescription",
            action: () => alert("Viewing prescription..."),
        },
        {
            label: "View Medical History",
            action: () => alert("Viewing medical history..."),
        },
        {
            label: "Request an Appointment",
            action: () => alert("Requesting appointment..."),
        },
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="bg-gray-950 text-white font-sans antialiased min-h-screen">
            {/* Profile Section */}
            <section className="py-16 bg-gray-950">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-500">
                            {user.username}
                        </h1>
                        <p className="text-gray-400 mb-4">{user.email}</p>
                        <p className="text-gray-400 mb-4">
                            {user.phone
                                ? user.phone
                                : "Phone number not provided"}
                        </p>
                        <p className="text-gray-400 mb-4">
                            {user.address
                                ? user.address
                                : "Address not provided"}
                        </p>

                        {/* Medical History */}
                        {user.medicalHistory && user.medicalHistory.length > 0 ? (
                            <div className="text-gray-400 mb-4">
                                <strong>Medical History:</strong>
                                <ul>
                                    {user.medicalHistory.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-gray-400 mb-4">
                                No medical history available.
                            </p>
                        )}

                        <div className="flex space-x-6 mt-8 flex-wrap justify-center">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg text-xs mb-4"
                            >
                                Edit Profile
                            </button>
                            <button className="bg-transparent border-2 border-emerald-500 text-emerald-500 font-bold py-2 px-6 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg text-xs mb-4">
                                Change Password
                            </button>
                        </div>

                        {/* Logout Button */}
                        <div className="mt-8">
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg text-xs"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* New Components Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
                        {components.map((component, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 p-6 rounded-2xl text-center shadow-lg transition-transform duration-300 hover:scale-105"
                            >
                                <div
                                    onClick={component.action}
                                    className="text-2xl font-bold text-emerald-500 cursor-pointer mb-1"
                                >
                                    {component.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {isEditModalOpen && (
                <EditForm
                    user={user}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSaveProfile}
                />
            )}
        </div>
    );
};

export default ProfilePage;
