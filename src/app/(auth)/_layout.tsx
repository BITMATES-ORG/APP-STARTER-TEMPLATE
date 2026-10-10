import { useAuth } from "@/store/useAuth";
import { Stack } from "expo-router";

export default function AuthLayout() {
  const user = useAuth((s) => s.user);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="forgot-password" />
      </Stack.Protected>

      <Stack.Protected guard={!!user && !user.isVerified}>
        <Stack.Screen name="verify-email" />
      </Stack.Protected>
    </Stack>
  );
}
