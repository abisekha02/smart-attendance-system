export type UserRole = 'admin' | 'marketing' | 'employee' | 'center_head';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  centerId: string | null;
  avatar?: string | null;
  phoneNumber?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}