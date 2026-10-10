import SafeScreen from "@/components/SafeScreen";
import { useAuth } from "@/store/useAuth";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const checkAuth = useAuth((s) => s.checkAuth);
  const isInitializing = useAuth((s) => s.isInitializing);
  const user = useAuth((s) => s.user);

  // Verify the stored token once, on app start.
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isInitializing) SplashScreen.hideAsync();
  }, [isInitializing]);

  // Don't render any route until we know who the user is,
  // otherwise protected screens flash before the check finishes.
  if (isInitializing) return null;

  const isVerified = !!user?.isVerified;

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Only fully verified users can see the app */}
          <Stack.Protected guard={isVerified}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>

          {/* Everyone else (logged out OR unverified) lives in (auth) */}
          <Stack.Protected guard={!isVerified}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
        </Stack>
      </SafeScreen>
    </SafeAreaProvider>
  );
}
