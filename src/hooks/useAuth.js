import { useState, useCallback } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(async (email, password) => {
    try {
      // Simulando uma chamada de API
      const response = {
        user: {
          id: 'mock-user-id',
          email: email,
          role: 'authenticated',
        },
        token: 'mock-token',
      };

      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}; 