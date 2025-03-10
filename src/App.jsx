// In App.jsx
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import "./App.css";

// Protected route component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // If still loading, show a loading indicator or return null
    if (loading) {
        return <div>Loading...</div>;
    }

    // Once loaded, check if authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    return children;
};

function AppContent() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <LandingPage />
                        </Layout>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/profile"
                    element={
                            <Layout>
                                <ProfilePage />
                            </Layout>
                    }
                />
            </Routes>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
