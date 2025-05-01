import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { useEffect, useState } from "react";
import "./App.css";

// Import layout
import MainLayout from "./layouts/MainLayout";

// Import auth context
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Import pages
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import ClientDashboard from "./pages/Dashboard/Client";
import LawyerDashboard from "./pages/Dashboard/Lawyer";

// 404 Page component
const NotFoundPage = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h1 className="text-6xl font-bold text-gray-800 mb-6">404</h1>
    <h2 className="text-2xl font-medium mb-8">Page Not Found</h2>
    <p className="text-gray-600 mb-8">
      The page you are looking for doesn't exist or has been moved.
    </p>
    <a
      href="/"
      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-block"
    >
      Go Home
    </a>
  </div>
);

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If role is required and user doesn't have it
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard
    if (user?.role === "lawyer") {
      return <Navigate to="/dashboard/lawyer" replace />;
    } else {
      return <Navigate to="/dashboard/client" replace />;
    }
  }

  // Authenticated and has right role (or no specific role required)
  return <>{children}</>;
};

// App Routes component (inside the AuthProvider)
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <AboutPage />
          </MainLayout>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard/client"
        element={
          <ProtectedRoute requiredRole="client">
            <MainLayout>
              <ClientDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/lawyer"
        element={
          <ProtectedRoute requiredRole="lawyer">
            <MainLayout>
              <LawyerDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback Routes */}
      <Route
        path="/404"
        element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        }
      />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
