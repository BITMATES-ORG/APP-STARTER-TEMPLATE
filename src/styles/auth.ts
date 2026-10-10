import { THEME, tokens } from "@/lib/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: THEME.background },
  body: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: tokens.spacing.xl,
    paddingVertical: tokens.spacing.xxl,
    gap: tokens.spacing.xl,
  },
  header: { alignItems: "center", gap: tokens.spacing.sm },
  logo: {
    width: 64,
    height: 64,
    borderRadius: tokens.radius.xl,
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
  subtitle: { color: THEME.textSecondary, fontSize: tokens.fontSize.md },

  card: {
    backgroundColor: THEME.cardBackground,
    borderColor: THEME.border,
    borderWidth: 1,
    borderRadius: tokens.radius.xl,
    padding: tokens.spacing.xl,
    gap: tokens.spacing.lg,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    shadowColor: THEME.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

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

  forgot: { alignSelf: "flex-end", marginTop: -4 },
  link: { color: THEME.link, fontSize: tokens.fontSize.sm, fontWeight: "700" },

  primaryBtn: {
    backgroundColor: THEME.primary,
    height: 52,
    borderRadius: tokens.radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    color: THEME.onPrimary,
    fontSize: tokens.fontSize.md,
    fontWeight: "700",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.md,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: THEME.divider },
  dividerText: { color: THEME.textMuted, fontSize: tokens.fontSize.sm },

  googleBtn: {
    height: 52,
    borderRadius: tokens.radius.pill,
    borderWidth: 1.5,
    borderColor: THEME.border,
    backgroundColor: THEME.cardElevated,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing.md,
  },
  googleText: {
    color: THEME.textPrimary,
    fontSize: tokens.fontSize.md,
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: { color: THEME.textSecondary, fontSize: tokens.fontSize.sm },
});
