import { THEME, tokens } from "@/lib/themes";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_SECONDS = 30;

const ForgotPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Resend cooldown
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(auth)");
  };

  const sendLink = async () => {
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Enter a valid email address");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      // TODO: POST /api/forgot-password with { email: email.trim() }
      // Tip: have the backend respond the same way whether or not the account
      // exists, so this screen can't be used to discover registered emails.
      await new Promise((r) => setTimeout(r, 1000));
      setSent(true);
      setSecondsLeft(RESEND_SECONDS);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const borderColor = error
    ? THEME.error
    : focused
      ? THEME.borderFocus
      : THEME.border;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable
        onPress={goBack}
        hitSlop={12}
        style={styles.back}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Feather name="arrow-left" size={22} color={THEME.textPrimary} />
      </Pressable>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {sent ? (
          <>
            {/* Success state */}
            <View style={styles.header}>
              <View style={styles.iconCircle}>
                <Feather name="check" size={30} color={THEME.onPrimary} />
              </View>
              <Text style={styles.title}>Check your email</Text>
              <Text style={styles.subtitle}>
                If an account exists for{"\n"}
                <Text style={styles.email}>{email.trim()}</Text>
                {"\n"}you'll receive a link to reset your password.
              </Text>
            </View>

            <Pressable
              onPress={goBack}
              style={({ pressed }) => [
                styles.button,
                pressed && { opacity: 0.85 },
              ]}
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>Back to login</Text>
            </Pressable>

            <View style={styles.resendRow}>
              <Text style={styles.footerText}>Didn't get it? </Text>
              <Pressable
                onPress={sendLink}
                disabled={secondsLeft > 0 || loading}
                hitSlop={8}
              >
                <Text
                  style={[
                    styles.link,
                    secondsLeft > 0 && { color: THEME.textMuted },
                  ]}
                >
                  {secondsLeft > 0
                    ? `Resend in ${secondsLeft}s`
                    : "Resend link"}
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            {/* Form state */}
            <View style={styles.header}>
              <View style={styles.iconCircle}>
                <Feather name="key" size={28} color={THEME.onPrimary} />
              </View>
              <Text style={styles.title}>Forgot password?</Text>
              <Text style={styles.subtitle}>
                Enter the email linked to your account and we'll send you a link
                to reset your password.
              </Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <View style={[styles.inputRow, { borderColor }]}>
                <Feather
                  name="mail"
                  size={20}
                  color={focused ? THEME.primary : THEME.textMuted}
                />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    if (error) setError(null);
                  }}
                  placeholder="you@example.com"
                  placeholderTextColor={THEME.placeholderText}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="send"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onSubmitEditing={sendLink}
                />
              </View>
              {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>

            <Pressable
              onPress={sendLink}
              disabled={loading}
              style={({ pressed }) => [
                styles.button,
                { opacity: pressed || loading ? 0.85 : 1 },
              ]}
              accessibilityRole="button"
            >
              {loading ? (
                <ActivityIndicator color={THEME.onPrimary} />
              ) : (
                <Text style={styles.buttonText}>Send reset link</Text>
              )}
            </Pressable>

            <Pressable
              onPress={() => router.push("/(auth)")}
              hitSlop={8}
              style={styles.backToLogin}
            >
              <Text style={styles.footerText}>
                Remember it? <Text style={styles.link}>Login</Text>
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: THEME.background },
  back: {
    position: "absolute",
    top: tokens.spacing.lg,
    left: tokens.spacing.xl,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: tokens.radius.pill,
    backgroundColor: THEME.cardBackground,
    borderWidth: 1,
    borderColor: THEME.border,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: tokens.spacing.xl,
    paddingVertical: tokens.spacing.xxl,
    gap: tokens.spacing.xl,
  },
  header: { alignItems: "center", gap: tokens.spacing.sm },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: tokens.radius.xl,
    backgroundColor: THEME.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: tokens.spacing.sm,
  },
  title: {
    color: THEME.textPrimary,
    fontSize: tokens.fontSize.xxl,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: THEME.textSecondary,
    fontSize: tokens.fontSize.md,
    textAlign: "center",
    lineHeight: 22,
  },
  email: { color: THEME.textPrimary, fontWeight: "700" },

  field: { gap: 6 },
  label: {
    color: THEME.textSecondary,
    fontSize: tokens.fontSize.sm,
    fontWeight: "600",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.md,
    backgroundColor: THEME.inputBackground,
    borderWidth: 1.5,
    borderRadius: tokens.radius.md,
    paddingHorizontal: tokens.spacing.lg,
    height: 52,
  },
  input: {
    flex: 1,
    color: THEME.textPrimary,
    fontSize: tokens.fontSize.md,
    height: "100%",
  },
  error: { color: THEME.error, fontSize: tokens.fontSize.xs },

  button: {
    height: 52,
    borderRadius: tokens.radius.pill,
    backgroundColor: THEME.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: THEME.onPrimary,
    fontSize: tokens.fontSize.md,
    fontWeight: "700",
  },

  backToLogin: { alignItems: "center" },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: { color: THEME.textSecondary, fontSize: tokens.fontSize.sm },
  link: { color: THEME.link, fontSize: tokens.fontSize.sm, fontWeight: "700" },
});
