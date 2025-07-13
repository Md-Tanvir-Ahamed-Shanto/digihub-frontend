import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import { AuthState, AuthContextType, UserRole } from '../types/auth';
import { jwtDecode } from 'jwt-decode'; 
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    loading: true, // Start as loading
  });

  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedAccessToken = localStorage.getItem('accessToken');
        if (storedAccessToken) {
          const decodedUser: { id: string; email: string; role: UserRole; exp: number } = jwtDecode(storedAccessToken);

          // Check if token is expired on app load
          if (decodedUser.exp * 1000 < Date.now()) {
            console.warn('Auth token expired on load. Logging out.');
            localStorage.removeItem('accessToken');
            setAuthState({
              isAuthenticated: false,
              user: null,
              accessToken: null,
              loading: false,
            });
            return;
          }

          setAuthState({
            isAuthenticated: true,
            user: {
              id: decodedUser.id,
              email: decodedUser.email,
              role: decodedUser.role,
            },
            accessToken: storedAccessToken,
            loading: false,
          });
        } else {
          setAuthState((prev) => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Failed to decode token or load from storage:', error);
        localStorage.removeItem('accessToken'); // Clear invalid token
        setAuthState({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          loading: false,
        });
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (accessToken: string) => { // Only one token
    try {
      localStorage.setItem('accessToken', accessToken);
      const decodedUser: { id: string; email: string; role: UserRole; exp: number } = jwtDecode(accessToken);

      setAuthState({
        isAuthenticated: true,
        user: {
          id: decodedUser.id,
          email: decodedUser.email,
          role: decodedUser.role,
        },
        accessToken: accessToken,
        loading: false,
      });
    } catch (error) {
      console.error('Login failed (token decoding issue):', error);
      logout(); // Logout if token is invalid
      throw new Error('Invalid token provided.');
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      loading: false,
    });
    // Redirect to login page on logout (e.g., if triggered manually)
    window.location.href = '/client-login'; // Or your preferred generic login route
  };

  const contextValue = useMemo(() => ({ ...authState, login, logout }), [authState, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};