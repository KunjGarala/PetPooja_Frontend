import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import LandingPage from "./components/LandingPage.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import "./App.css";
import AnalysisPage from "./components/AnalysisPage.jsx";

// Protected route component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // If still loading, show a loading indicator or return null
    if (loading) {
        return <div>Loading...</div>;
    }

    // Once loaded, check if authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
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
                        <ProtectedRoute>
                            <Layout>
                                <ProfilePage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
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
            <AnalysisPage />
        </AuthProvider>
    );
}

export default App;
