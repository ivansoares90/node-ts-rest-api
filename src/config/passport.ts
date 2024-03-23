import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { AppError } from '@/middlewares/error.middleware';
import { JwtPayload, AuthUser } from '@/types/auth.types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload: JwtPayload, done) => {
    try {
      // Remove JWT-specific fields before passing to the request
      const user: AuthUser = {
        userId: payload.userId,
        email: payload.email,
      };
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }),
);

export default passport; 