import { ENV } from "@/lib/env";
import { AuthResponse, User } from "@/types";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

const TOKEN_KEY = "token";

// For testing purpose
const USE_MOCK = true;

const mockUser = (isVerified: boolean): User => ({
  firstName: "Booyah",
  lastName: "Booyah",
  username: "Booyah",
  email: "booyah@booyah.com",
  isVerified: false,
  createdAt: "Yesterday",
});

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type AuthPayload = { user: User; token: string };

async function request<T>(
  path: string,
  opts: { method?: "GET" | "POST"; body?: unknown; token?: string | null } = {},
): Promise<T> {
  const res = await fetch(`${ENV.BACKEND_URL}${path}`, {
    method: opts.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  // fetch only rejects on network failure. 4xx/5xx still resolve, so check res.ok.
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data?.message ?? "Something went wrong!", res.status);
  }
  return data as T;
}

const messageOf = (e: unknown) =>
  e instanceof Error ? e.message : "Something went wrong!";

interface AuthStore {
  user: User | null;
  token: string | null;
  isInitializing: boolean; // true until the first checkAuth finishes (gates the whole app)
  isLoading: boolean;

  checkAuth: () => Promise<AuthResponse>;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (
    userName: string,
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  markVerified: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isInitializing: true,
  isLoading: false,

  checkAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!token) {
        set({ user: null, token: null });
        return { success: false };
      }

      // Replace with your actual backend fetching mechanism
      const { user } = USE_MOCK
        ? { user: mockUser(true) }
        : await request<{ user: User }>("/api/me", { token });

      set({ user, token });
      return { success: true, user };
    } catch (error) {
      if (
        error instanceof ApiError &&
        (error.status === 401 || error.status === 403)
      ) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        set({ token: null });
      }
      set({ user: null });
      return { success: false, error: messageOf(error) };
    } finally {
      set({ isInitializing: false });
    }
  },

  register: async (userName, email, password, firstName, lastName) => {
    set({ isLoading: true });
    try {
      const { user, token } = USE_MOCK
        ? { user: mockUser(false), token: "booyah123" }
        : await request<AuthPayload>("/api/register", {
            method: "POST",
            body: { firstName, lastName, userName, email, password },
          });

      await SecureStore.setItemAsync(TOKEN_KEY, token, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      set({ user, token });
      return { success: true, user };
    } catch (error) {
      return { success: false, error: messageOf(error) };
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { user, token } = USE_MOCK
        ? { user: mockUser(true), token: "booyah123" }
        : await request<AuthPayload>("/api/login", {
            method: "POST",
            body: { email, password },
          });

      await SecureStore.setItemAsync(TOKEN_KEY, token, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      set({ user, token });
      return { success: true, user };
    } catch (error) {
      return { success: false, error: messageOf(error) };
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    set({ user: null, token: null });
  },

  // Call this after the email code/link is confirmed. The route guards react automatically.
  markVerified: () =>
    set((s) => (s.user ? { user: { ...s.user, isVerified: true } } : s)),
}));
