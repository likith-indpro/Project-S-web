import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/AuthContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState<string | null>(null);

  // Fetch role name when component mounts or user changes
  useEffect(() => {
    const fetchRoleName = async () => {
      if (!user?.role) {
        setRoleName(null);
        return;
      }

      try {
        // Use fetch directly to get role information
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/roles/${user.role}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRoleName(data.data.name);
        } else {
          setRoleName("default");
        }
      } catch (error) {
        console.error("Failed to fetch role name:", error);
        setRoleName("default");
      }
    };

    if (user?.role) {
      fetchRoleName();
    } else {
      setRoleName(null);
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Determine which dashboard to link to based on user role name
  const dashboardLink =
    roleName === "lawyer" ? "/dashboard/lawyer" : "/dashboard/client";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Legal Connect
          </Link>

          <div className="space-x-6">
            {isAuthenticated && (
              <Link
                to={dashboardLink}
                className="hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Hello, {user?.first_name || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-white shadow-inner mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Legal Connect</h3>
              <p className="text-gray-600">
                Connecting clients with legal professionals for personalized
                legal services.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-gray-600">
                {isAuthenticated && (
                  <li>
                    <Link to={dashboardLink} className="hover:text-blue-600">
                      Dashboard
                    </Link>
                  </li>
                )}
                {!isAuthenticated && (
                  <>
                    <li>
                      <Link to="/login" className="hover:text-blue-600">
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="hover:text-blue-600">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Email: info@legalconnect.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: 123 Legal St, City</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-gray-500">
            &copy; {new Date().getFullYear()} Legal Connect. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
