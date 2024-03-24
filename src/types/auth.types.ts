export interface JwtPayload {
  userId: string;
  email: string;
  iat: number; // Issued at
  exp: number; // Expiration time
  jti?: string; // JWT ID
  sub?: string; // Subject
  aud?: string; // Audience
  iss?: string; // Issuer
}

export interface AuthUser extends JwtPayload {
  userId: string;
  email: string;
} 