import React from 'react';
import { getToken } from '../services/keychain';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await getToken();
    setIsAuthenticated(!!token);
  };

  if (isAuthenticated === null) {
    return null; // atau loading spinner
  }

  if (!isAuthenticated) {
    // Redirect ke LoginScreen akan dihandle oleh navigation
    return null;
  }

  return <>{children}</>;
};