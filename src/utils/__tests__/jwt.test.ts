import { generateToken, verifyToken } from '../jwt.utils';
import { AppError } from '../../middlewares/error.middleware';
import { JwtPayload } from '../../types/auth.types';

describe('JWT Utils', () => {
  const mockPayload = {
    userId: '123',
    email: 'test@example.com',
  };

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const token = generateToken(mockPayload);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // JWT has 3 parts
    });

    it('should generate different tokens for different payloads', () => {
      const token1 = generateToken({ ...mockPayload, userId: '1' });
      const token2 = generateToken({ ...mockPayload, userId: '2' });
      expect(token1).not.toBe(token2);
    });

    it('should generate different tokens for the same payload due to timestamp', () => {
      const token1 = generateToken(mockPayload);
      const token2 = generateToken(mockPayload);
      expect(token1).not.toBe(token2);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const token = generateToken(mockPayload);
      const decoded = verifyToken(token);
      expect(decoded).toBeDefined();
      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.email).toBe(mockPayload.email);
      expect(decoded.iat).toBeDefined();
      expect(decoded.exp).toBeDefined();
    });

    it('should throw AppError for invalid token', () => {
      const invalidToken = 'invalid.token.string';
      expect(() => verifyToken(invalidToken)).toThrow(AppError);
      expect(() => verifyToken(invalidToken)).toThrow('Invalid token');
    });

    it('should verify token expiration is in the future', () => {
      const token = generateToken(mockPayload);
      const decoded = verifyToken(token);
      const exp = decoded.exp;
      const now = Math.floor(Date.now() / 1000);
      expect(exp).toBeGreaterThan(now);
    });

    it('should throw AppError for malformed token', () => {
      const malformedToken = 'not.a.jwt.token';
      expect(() => verifyToken(malformedToken)).toThrow(AppError);
      expect(() => verifyToken(malformedToken)).toThrow('Invalid token');
    });

    it('should throw AppError for empty token', () => {
      expect(() => verifyToken('')).toThrow(AppError);
      expect(() => verifyToken('')).toThrow('Invalid token');
    });

    it('should throw AppError for undefined token', () => {
      expect(() => verifyToken(undefined as unknown as string)).toThrow(AppError);
      expect(() => verifyToken(undefined as unknown as string)).toThrow('Invalid token');
    });
  });
}); 