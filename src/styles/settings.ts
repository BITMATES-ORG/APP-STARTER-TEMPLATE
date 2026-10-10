import { THEME, tokens } from "@/lib/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: THEME.background,
    gap: tokens.spacing.lg,
    paddingHorizontal: 12,
  },
  profileCard: {
    backgroundColor: THEME.cardBackground,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    gap: 10,
    borderRadius: tokens.radius.lg,
  },
  profilePicture: {
    backgroundColor: "#fff",
    borderRadius: "50%",
    elevation: 10,
  },
  image: {
    width: 128,
    height: 128,
  },
  profileDetails: {
    width: "100%",
    padding: 8,
    gap: 2,
  },
  mainText: {
    color: THEME.textPrimary,
    fontSize: tokens.fontSize.xl,
    fontWeight: "600",
  },
  secondaryText: {
    color: THEME.textSecondary,
    fontSize: tokens.fontSize.md,
  },
  muted: {
    color: THEME.placeholderText,
    fontSize: tokens.fontSize.sm,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: THEME.error,
    height: 52,
    borderRadius: tokens.radius.md,
  },
  logoutText: {
    color: THEME.white,
    fontSize: tokens.fontSize.md,
    fontWeight: "700",
  },
});
