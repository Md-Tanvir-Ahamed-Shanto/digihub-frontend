export type UserRole = 'admin' | 'client' | 'partner';

export interface BaseUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUser extends BaseUser {
  role: 'admin';
  image?: string;
}

export interface ClientUser extends BaseUser {
  role: 'client';
  phone?: string;
  companyName?: string;
  isActive: boolean;
  isEmailVerified: boolean;
}

export interface PartnerUser extends BaseUser {
  role: 'partner';
  skillSet: string[];
  industryExp: string[];
  country?: string;
  region?: string;
  profilePhoto?: string;
  hourlyRate?: number;
  portfolioLink?: string;
  isActive: boolean;
  rating?: number;
  totalEarnings: number;
  availableBalance: number;
}

export type User = AdminUser | ClientUser | PartnerUser;

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (accessToken: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}