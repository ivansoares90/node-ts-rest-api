export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthUser extends JwtPayload {
  userId: string;
  email: string;
} 