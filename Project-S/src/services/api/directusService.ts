import directusApi from "./directusApi";

// Generic type for API responses
type ApiResponse<T> = {
  data: T;
};

// Define user types
interface UserRegisterData {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

// Authentication service
export const authService = {
  login: async (email: string, password: string) => {
    const response = await directusApi.post("/auth/login", { email, password });
    // Store the token when login is successful
    localStorage.setItem("auth_token", response.data.data.access_token);
    return response.data;
  },
  register: async (userData: UserRegisterData) => {
    // Using the correct /auth/register endpoint
    const response = await directusApi.post("/auth/register", {
      email: userData.email,
      password: userData.password,
      // Note: first_name and last_name can only be set AFTER registration
      // through a separate update call
    });
    return response.data;
  },
  updateUserDetails: async (
    userId: string,
    data: { first_name?: string; last_name?: string; role?: string }
  ) => {
    // This would need to be done after registration by an admin
    // or via a custom Directus API endpoint/hook
    const response = await directusApi.patch(`/users/${userId}`, data);
    return response.data;
  },
  logout: async () => {
    await directusApi.post("/auth/logout");
    localStorage.removeItem("auth_token");
  },
  refreshToken: async () => {
    const response = await directusApi.post("/auth/refresh");
    localStorage.setItem("auth_token", response.data.data.access_token);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await directusApi.get("/users/me");
    return response.data;
  },
};

// Generic service for CRUD operations on any collection
export const createCollectionService = <T>(collection: string) => {
  return {
    getAll: async (params?: Record<string, any>) => {
      const response = await directusApi.get<ApiResponse<T[]>>(
        `/items/${collection}`,
        { params }
      );
      return response.data;
    },

    getOne: async (id: string | number) => {
      const response = await directusApi.get<ApiResponse<T>>(
        `/items/${collection}/${id}`
      );
      return response.data;
    },

    create: async (item: Partial<T>) => {
      const response = await directusApi.post<ApiResponse<T>>(
        `/items/${collection}`,
        item
      );
      return response.data;
    },

    update: async (id: string | number, updates: Partial<T>) => {
      const response = await directusApi.patch<ApiResponse<T>>(
        `/items/${collection}/${id}`,
        updates
      );
      return response.data;
    },

    delete: async (id: string | number) => {
      const response = await directusApi.delete(`/items/${collection}/${id}`);
      return response.data;
    },
  };
};

// Example of a specific collection service
// You can create specific services for each collection as needed
export const usersService = createCollectionService<{
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}>("users");

// Roles service for handling role information
export const rolesService = {
  ...createCollectionService<{
    id: string;
    name: string;
    // Add other role properties as needed
  }>("roles"),

  getRoleName: async (roleId: string): Promise<string> => {
    try {
      const response = await directusApi.get(`/roles/${roleId}`);
      return response.data.data.name || "default";
    } catch (error) {
      console.error("Error fetching role name:", error);
      return "default";
    }
  },
};

// Add more specific collection services as needed
