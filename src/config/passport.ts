import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { AppError } from '@/middlewares/error.middleware';

interface JwtPayload {
  userId: string;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload: JwtPayload, done) => {
    try {
      // In a real application, you would fetch the user from your database here
      // For now, we'll just return the payload
      return done(null, payload);
    } catch (error) {
      return done(error, false);
    }
  }),
);

export default passport; 