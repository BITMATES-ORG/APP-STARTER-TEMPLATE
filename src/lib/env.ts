const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

if (!BACKEND_URL && process.env.NODE_ENV === "production") {
  throw new Error("BACKEND_URL must be set in production");
}

export const ENV = {
  BACKEND_URL: BACKEND_URL ?? "http://localhost:3000",
  GOOGLE_WEB_CLIENT_ID,
} as const;
