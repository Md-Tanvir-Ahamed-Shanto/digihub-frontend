export type UserRole = 'admin' | 'partner' | 'client';

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    role: UserRole;
    // Add any other user properties you get from your token/API
  } | null;
  accessToken: string | null; // This is the single token
  loading: boolean; // To indicate if auth state is being loaded (e.g., from local storage)
}

export interface AuthContextType extends AuthState {
  login: (accessToken: string) => Promise<void>; // Updated signature: only one token
  logout: () => void;
}