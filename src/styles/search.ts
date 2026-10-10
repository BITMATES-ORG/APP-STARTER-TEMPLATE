import { THEME, tokens } from "@/lib/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: THEME.background,
    gap: tokens.spacing.lg,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
