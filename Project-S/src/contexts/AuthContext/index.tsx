import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/api/directusService";

// Define types for our context
interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
  updateUser: () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in (on component mount)
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (token) {
          // Get user info if token exists
          const userInfo = await authService.getCurrentUser();
          setUser(userInfo.data);
        }
      } catch (err) {
        // Token might be invalid, clear it
        localStorage.removeItem("auth_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authService.login(email, password);

      // Get current user after successful login
      const userInfo = await authService.getCurrentUser();
      setUser(userInfo.data);

      // Check stored user type (from registration) to handle first login
      const storedUserType = localStorage.getItem("user_type");
      const storedUserDetails = localStorage.getItem("user_details");

      if (storedUserType && storedUserDetails) {
        // If this is a first login after registration, update user details
        try {
          const details = JSON.parse(storedUserDetails);
          await authService.updateUserDetails(userInfo.data.id, {
            first_name: details.first_name,
            last_name: details.last_name,
            role: storedUserType,
          });

          // Update local user state with new details
          setUser((prev) =>
            prev
              ? {
                  ...prev,
                  first_name: details.first_name,
                  last_name: details.last_name,
                  role: storedUserType,
                }
              : null
          );

          // Clear the stored registration data
          localStorage.removeItem("user_type");
          localStorage.removeItem("user_details");
        } catch (updateErr) {
          console.error("Failed to update user details:", updateErr);
        }
      }

      // Redirect based on user role
      if (userInfo.data?.role === "lawyer") {
        navigate("/dashboard/lawyer");
      } else {
        navigate("/dashboard/client");
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_info");
      setUser(null);
      navigate("/login");
    }
  };

  // Update user function
  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...userData } : null));
  };

  // Provide auth context
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
