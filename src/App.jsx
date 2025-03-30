import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { InventoryProvider } from "./contexts/InventoryContext";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import LandingPage from "./components/LandingPage.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import "./App.css";
import AnalysisPage from "./components/AnalysisPage.jsx";
import Inventory from "./components/Inventory.jsx";
import Layout from "./components/Layout";
import RecipeAssistant from "./components/RecipeAssistant.jsx";
// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                // <ProtectedRoute>
                  <Layout><ProfilePage /></Layout>
                // </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                // <ProtectedRoute>
                  <Layout><Dashboard /></Layout>
                // </ProtectedRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                // <ProtectedRoute>
                  <Layout><Inventory /></Layout>
                // </ProtectedRoute>
              }
            />
            <Route
              path="/Analysis"
              element={
                <Layout><AnalysisPage /></Layout>
              }
            />
            <Route
              path="/recipeassistant"
              element={
                <Layout><RecipeAssistant /></Layout>
              }
            />
          </Routes>
        </Router>
      </InventoryProvider>
    </AuthProvider>
  );
}

export default App;
