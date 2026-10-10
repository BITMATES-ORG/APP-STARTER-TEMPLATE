import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { THEME } from "@/lib/themes";
import { useAuth } from "@/store/useAuth";
import { styles } from "@/styles/auth";
import { AuthResponse } from "@/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginScreen = () => {
  const passwordRef = useRef<TextInput>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<"email" | "password" | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const router = useRouter();
  const { isLoading, login } = useAuth();

  const validate = () => {
    const next: typeof errors = {};
    if (!EMAIL_REGEX.test(email.trim()))
      next.email = "Enter a valid email address";
    if (password.length < 6)
      next.password = "Password must be at least 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    const response: AuthResponse = await login(email, password);
    if (response.error) {
      Alert.alert(response.error || "Something went wrong");
      return;
    }
    if (!response.success) {
      Alert.alert("Something went wrong!");
    }
    if (response.user?.isVerified) {
      router.push("/(tabs)/home");
    } else {
      router.push("/(auth)/verify-email");
    }
  };

  const handleGoogle = () => {
    // TODO: Implement Google sign-in with @react-native-google-signin (second branch)
  };

  const borderFor = (field: "email" | "password") =>
    errors[field]
      ? THEME.error
      : focused === field
        ? THEME.borderFocus
        : THEME.border;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Ionicons name="lock-closed" size={34} color={THEME.primaryDark} />
          </View>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Login to continue!</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Email */}
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <View
              style={[styles.inputRow, { borderColor: borderFor("email") }]}
            >
              <Ionicons
                name="mail-outline"
                size={20}
                color={focused === "email" ? THEME.primary : THEME.textMuted}
              />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  if (errors.email)
                    setErrors((e) => ({ ...e, email: undefined }));
                }}
                placeholder="you@example.com"
                placeholderTextColor={THEME.placeholderText}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="next"
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            </View>
            {errors.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}
          </View>

          {/* Password */}
          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View
              style={[styles.inputRow, { borderColor: borderFor("password") }]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={focused === "password" ? THEME.primary : THEME.textMuted}
              />
              <TextInput
                ref={passwordRef}
                style={styles.input}
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  if (errors.password)
                    setErrors((e) => ({ ...e, password: undefined }));
                }}
                placeholder="Enter your password"
                placeholderTextColor={THEME.placeholderText}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
                textContentType="password"
                returnKeyType="done"
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                onSubmitEditing={handleLogin}
              />
              <Pressable
                onPress={() => setShowPassword((s) => !s)}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={THEME.textMuted}
                />
              </Pressable>
            </View>
            {errors.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}
          </View>

          <Link href="/(auth)/forgot-password" style={styles.forgot}>
            <Text style={styles.link}>Forgot password?</Text>
          </Link>

          {/* Login button */}
          <Pressable
            onPress={handleLogin}
            disabled={isLoading}
            style={({ pressed }) => [
              { opacity: pressed || isLoading ? 0.85 : 1 },
            ]}
            accessibilityRole="button"
          >
            <View style={styles.primaryBtn}>
              {isLoading ? (
                <ActivityIndicator color={THEME.onPrimary} />
              ) : (
                <Text style={styles.primaryBtnText}>Login</Text>
              )}
            </View>
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google */}
          <Pressable
            onPress={handleGoogle}
            style={({ pressed }) => [
              styles.googleBtn,
              pressed && { opacity: 0.8 },
            ]}
            accessibilityRole="button"
          >
            <Ionicons name="logo-google" size={20} color={THEME.textPrimary} />
            <Text style={styles.googleText}>Continue with Google</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Link href="/(auth)/signup" style={styles.link}>
            Sign up
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
