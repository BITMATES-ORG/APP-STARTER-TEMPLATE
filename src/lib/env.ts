const BACKEND_URL = process.env.BACKEND_URL;

if (!BACKEND_URL && process.env.NODE_ENV === 'production') {
  throw new Error('BACKEND_URL must be set in production');
}

export const ENV = {
  BACKEND_URL: BACKEND_URL ?? 'http://localhost:3000',
} as const;
