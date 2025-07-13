import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client' | 'partner';
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  phone?: string;
  companyName?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
  skillSet?: string[];
  industryExp?: string[];
  country?: string;
  region?: string;
  profilePhoto?: string;
  hourlyRate?: number;
  portfolioLink?: string;
  rating?: number;
  totalEarnings?: number;
  availableBalance?: number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (accessToken: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>(() => ({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    loading: true,
  }));

  const loadUserFromStorage = useCallback(() => {
    try {
      const storedAccessToken = localStorage.getItem('accessToken');
      if (!storedAccessToken) {
        setAuthState(prev => ({ ...prev, loading: false }));
        return null;
      }

      const decodedToken = jwtDecode<{
        id: string;
        email: string;
        name: string;
        role: 'admin' | 'client' | 'partner';
        exp: number;
        image?: string;
        phone?: string;
        companyName?: string;
        isActive?: boolean;
        isEmailVerified?: boolean;
        skillSet?: string[];
        industryExp?: string[];
        country?: string;
        region?: string;
        profilePhoto?: string;
        hourlyRate?: number;
        portfolioLink?: string;
        rating?: number;
        totalEarnings?: number;
        availableBalance?: number;
      }>(storedAccessToken);

      if (decodedToken.exp * 1000 < Date.now()) {
        console.warn('Auth token expired on load. Logging out.');
        localStorage.removeItem('accessToken');
        setAuthState({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          loading: false,
        });
        return null;
      }

      const user: User = {
        id: decodedToken.id,
        email: decodedToken.email,
        name: decodedToken.name,
        role: decodedToken.role,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...(decodedToken.image && { image: decodedToken.image }),
        ...(decodedToken.phone && { phone: decodedToken.phone }),
        ...(decodedToken.companyName && { companyName: decodedToken.companyName }),
        ...(decodedToken.isActive !== undefined && { isActive: decodedToken.isActive }),
        ...(decodedToken.isEmailVerified !== undefined && { isEmailVerified: decodedToken.isEmailVerified }),
        ...(decodedToken.skillSet && { skillSet: decodedToken.skillSet }),
        ...(decodedToken.industryExp && { industryExp: decodedToken.industryExp }),
        ...(decodedToken.country && { country: decodedToken.country }),
        ...(decodedToken.region && { region: decodedToken.region }),
        ...(decodedToken.profilePhoto && { profilePhoto: decodedToken.profilePhoto }),
        ...(decodedToken.hourlyRate && { hourlyRate: decodedToken.hourlyRate }),
        ...(decodedToken.portfolioLink && { portfolioLink: decodedToken.portfolioLink }),
        ...(decodedToken.rating !== undefined && { rating: decodedToken.rating }),
        ...(decodedToken.totalEarnings !== undefined && { totalEarnings: decodedToken.totalEarnings }),
        ...(decodedToken.availableBalance !== undefined && { availableBalance: decodedToken.availableBalance }),
      };

      setAuthState({
        isAuthenticated: true,
        user,
        accessToken: storedAccessToken,
        loading: false,
      });

      return user;
    } catch (error) {
      console.error('Failed to decode token or load from storage:', error);
      localStorage.removeItem('accessToken');
      setAuthState({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        loading: false,
      });
      return null;
    }
  }, []);

  useEffect(() => {
    const user = loadUserFromStorage();
    if (user) {
      const dashboardRoute = user.role === 'admin' ? '/admin-dashboard' :
                            user.role === 'client' ? '/client-dashboard' :
                            '/partner-dashboard';
      navigate(dashboardRoute);
    }
  }, [loadUserFromStorage, navigate]);

  const login = useCallback(async (accessToken: string) => {
    try {
      localStorage.setItem('accessToken', accessToken);
      const user = loadUserFromStorage();
      if (!user) {
        throw new Error('Failed to load user after login');
      }
    } catch (error) {
      console.error('Login failed:', error);
      localStorage.removeItem('accessToken');
      setAuthState({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        loading: false,
      });
      throw error;
    }
  }, [loadUserFromStorage]);

  const logout = useCallback(() => {
    const role = authState.user?.role;
    localStorage.removeItem('accessToken');
    setAuthState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      loading: false,
    });
    const loginRoute = role === 'admin' ? '/admin-login' :
                      role === 'client' ? '/client-login' :
                      '/partner-login';
    navigate(loginRoute);
  }, [authState.user?.role, navigate]);

  const contextValue = useMemo(
    () => ({
      ...authState,
      login,
      logout,
      isAdmin: authState.user?.role === 'admin',
    }),
    [authState, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};