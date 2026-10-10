import { THEME, tokens } from "@/lib/themes";
import { useAuth } from "@/store/useAuth";
import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
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

const CODE_LENGTH = 6;
const RESEND_SECONDS = 30;

const VerifyEmail = () => {
  const user = useAuth((s) => s.user);
  const markVerified = useAuth((s) => s.markVerified);
  const logout = useAuth((s) => s.logout);

  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  const handleChange = (text: string) => {
    setCode(text.replace(/\D/g, "").slice(0, CODE_LENGTH));
    if (error) setError(null);
  };

  const handleVerify = async () => {
    if (code.length < CODE_LENGTH) {
      setError(`Enter the ${CODE_LENGTH}-digit code`);
      return;
    }
    try {
      setLoading(true);
      // TODO: POST /api/verify-email with { code }, and throw if the code is wrong
      await new Promise((r) => setTimeout(r, 1000));

      markVerified();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0) return;
    // TODO: POST /api/resend-verification
    setCode("");
    setError(null);
    setSecondsLeft(RESEND_SECONDS);
    inputRef.current?.focus();
  };

  const activeIndex = Math.min(code.length, CODE_LENGTH - 1);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Feather name="mail" size={28} color={THEME.onPrimary} />
          </View>
          <Text style={styles.title}>Verify your email</Text>
          <Text style={styles.subtitle}>
            We sent a {CODE_LENGTH}-digit code to{"\n"}
            <Text style={styles.email}>{user?.email ?? "your email"}</Text>
          </Text>
        </View>

        {/* Code boxes */}
        <View>
          <Pressable
            style={styles.codeRow}
            onPress={() => inputRef.current?.focus()}
            accessibilityLabel="Verification code"
          >
            {Array.from({ length: CODE_LENGTH }).map((_, i) => {
              const isActive = focused && i === activeIndex;
              const borderColor = error
                ? THEME.error
                : isActive
                  ? THEME.borderFocus
                  : THEME.border;
              return (
                <View key={i} style={[styles.box, { borderColor }]}>
                  <Text style={styles.digit}>{code[i] ?? ""}</Text>
                </View>
              );
            })}

            {/* Real input sits invisibly on top and drives the boxes */}
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              value={code}
              onChangeText={handleChange}
              keyboardType="number-pad"
              maxLength={CODE_LENGTH}
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              autoFocus
              caretHidden
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onSubmitEditing={handleVerify}
            />
          </Pressable>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>

        {/* Verify button */}
        <Pressable
          onPress={handleVerify}
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
            <Text style={styles.buttonText}>Verify</Text>
          )}
        </Pressable>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.resendRow}>
            <Text style={styles.footerText}>Didn't get it? </Text>
            <Pressable
              onPress={handleResend}
              disabled={secondsLeft > 0}
              hitSlop={8}
            >
              <Text
                style={[
                  styles.link,
                  secondsLeft > 0 && { color: THEME.textMuted },
                ]}
              >
                {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : "Resend code"}
              </Text>
            </Pressable>
          </View>
          <Pressable onPress={logout} hitSlop={8}>
            <Text style={styles.footerText}>Use a different email</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: THEME.background },
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

  codeRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: tokens.spacing.sm,
  },
  box: {
    width: 46,
    height: 56,
    borderRadius: tokens.radius.md,
    borderWidth: 1.5,
    backgroundColor: THEME.inputBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  digit: {
    color: THEME.textPrimary,
    fontSize: tokens.fontSize.xl,
    fontWeight: "700",
  },
  hiddenInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
  },
  error: {
    color: THEME.error,
    fontSize: tokens.fontSize.sm,
    textAlign: "center",
    marginTop: tokens.spacing.md,
  },

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

  footer: { alignItems: "center", gap: tokens.spacing.md },
  resendRow: { flexDirection: "row", alignItems: "center" },
  footerText: { color: THEME.textSecondary, fontSize: tokens.fontSize.sm },
  link: { color: THEME.link, fontSize: tokens.fontSize.sm, fontWeight: "700" },
});
