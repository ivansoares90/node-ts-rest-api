import morgan from 'morgan';
import { Request, Response } from 'express';

// Custom token for request body
morgan.token('body', (req: Request) => JSON.stringify(req.body));

// Custom token for response time
morgan.token('response-time', (req: Request, res: Response) => {
  const start = (req as any)._startAt;
  if (!start) return '';
  const diff = process.hrtime(start);
  const time = diff[0] * 1e3 + diff[1] * 1e-6;
  return time.toFixed(3) + 'ms';
});

// Custom format
const format = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time :body';

// Development format (includes request body)
export const devFormat = morgan(format, {
  skip: (req: Request) => req.method === 'OPTIONS',
});

// Production format (excludes sensitive data)
export const prodFormat = morgan('combined', {
  skip: (req: Request) => req.method === 'OPTIONS',
}); 