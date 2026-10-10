// Modify the User type for fields expected from the backend

export interface User {
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  imageUrl?: string | null;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  message?: string;
  user?: User;
}
