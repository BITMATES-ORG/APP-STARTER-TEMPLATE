export type ThemeMode = "light" | "dark";

export interface Theme {
  id: string;
  name: string;
  mode: ThemeMode;
  statusBar: "light" | "dark"; // value for expo-status-bar's `style`

  primary: string;
  primaryLight: string; // hover / pressed-soft / tinted surfaces
  primaryDark: string; // pressed state
  onPrimary: string; // text/icon colour that sits ON primary
  secondary: string;
  accent: string; // highlights, badges, "wow" moments

  textPrimary: string;
  textSecondary: string;
  textDark: string; // always-dark text (for light surfaces/chips)
  textMuted: string; // captions, disabled labels
  placeholderText: string;
  link: string;

  background: string;
  backgroundAlt: string; // sections, grouped lists
  cardBackground: string;
  cardElevated: string; // modals, sheets, popovers
  inputBackground: string;
  overlay: string; // modal scrim

  border: string;
  borderFocus: string; // focused input ring
  divider: string;
  shadow: string;

  tabBarBackground: string;
  tabBarActive: string;
  tabBarInactive: string;

  success: string;
  warning: string;
  error: string;
  info: string;

  white: string;
  black: string;

  gradientPrimary: [string, string];
  gradientBackground: [string, string];
  gradientAccent: [string, string];
}

const midnightAurora: Theme = {
  id: "midnight-aurora",
  name: "Midnight Aurora",
  mode: "dark",
  statusBar: "light",

  primary: "#7C5CFF",
  primaryLight: "#A38DFF",
  primaryDark: "#5B3DE0",
  onPrimary: "#FFFFFF",
  secondary: "#4F46E5",
  accent: "#22D3EE",

  textPrimary: "#F4F3FF",
  textSecondary: "#A9A6C9",
  textDark: "#14122B",
  textMuted: "#6F6C93",
  placeholderText: "#6B6890",
  link: "#8FB4FF",

  background: "#0B0A1A",
  backgroundAlt: "#100F24",
  cardBackground: "#16152E",
  cardElevated: "#1E1C3D",
  inputBackground: "#1A1934",
  overlay: "rgba(5, 4, 15, 0.72)",

  border: "#2A2850",
  borderFocus: "#7C5CFF",
  divider: "#201F3F",
  shadow: "#000000",

  tabBarBackground: "#0F0E22",
  tabBarActive: "#A38DFF",
  tabBarInactive: "#5E5B85",

  success: "#34D399",
  warning: "#FBBF24",
  error: "#FB7185",
  info: "#38BDF8",

  white: "#FFFFFF",
  black: "#000000",

  gradientPrimary: ["#7C5CFF", "#22D3EE"],
  gradientBackground: ["#0B0A1A", "#1A1340"],
  gradientAccent: ["#22D3EE", "#7C5CFF"],
};

const solarFlare: Theme = {
  id: "solar-flare",
  name: "Solar Flare",
  mode: "light",
  statusBar: "dark",

  primary: "#FF6B2C",
  primaryLight: "#FFB48C",
  primaryDark: "#E04E10",
  onPrimary: "#FFFFFF",
  secondary: "#F59E0B",
  accent: "#E11D48",

  textPrimary: "#2B1A10",
  textSecondary: "#7A5C4A",
  textDark: "#1F120A",
  textMuted: "#A98C7A",
  placeholderText: "#B79D8C",
  link: "#D9480F",

  background: "#FFF8F0",
  backgroundAlt: "#FFEFE0",
  cardBackground: "#FFFFFF",
  cardElevated: "#FFFFFF",
  inputBackground: "#FFF1E3",
  overlay: "rgba(43, 26, 16, 0.5)",

  border: "#F3D9C4",
  borderFocus: "#FF6B2C",
  divider: "#F7E4D3",
  shadow: "#B4531A",

  tabBarBackground: "#FFFFFF",
  tabBarActive: "#FF6B2C",
  tabBarInactive: "#C2A594",

  success: "#16A34A",
  warning: "#D97706",
  error: "#DC2626",
  info: "#2563EB",

  white: "#FFFFFF",
  black: "#000000",

  gradientPrimary: ["#FF6B2C", "#F59E0B"],
  gradientBackground: ["#FFF8F0", "#FFE6CF"],
  gradientAccent: ["#E11D48", "#FF6B2C"],
};

const emeraldNoir: Theme = {
  id: "emerald-noir",
  name: "Emerald Noir",
  mode: "dark",
  statusBar: "light",

  primary: "#10D98C",
  primaryLight: "#6EF0B8",
  primaryDark: "#0AA86C",
  onPrimary: "#04140E",
  secondary: "#14B8A6",
  accent: "#A3E635",

  textPrimary: "#EAFBF3",
  textSecondary: "#8FB5A5",
  textDark: "#04140E",
  textMuted: "#5F8272",
  placeholderText: "#5A7C6E",
  link: "#5EEAD4",

  background: "#060F0B",
  backgroundAlt: "#0A1812",
  cardBackground: "#0F211A",
  cardElevated: "#152C23",
  inputBackground: "#12261E",
  overlay: "rgba(2, 8, 5, 0.75)",

  border: "#1F3D31",
  borderFocus: "#10D98C",
  divider: "#16302A",
  shadow: "#000000",

  tabBarBackground: "#08130E",
  tabBarActive: "#10D98C",
  tabBarInactive: "#4D6E60",

  success: "#4ADE80",
  warning: "#FACC15",
  error: "#F87171",
  info: "#22D3EE",

  white: "#FFFFFF",
  black: "#000000",

  gradientPrimary: ["#10D98C", "#14B8A6"],
  gradientBackground: ["#060F0B", "#0D2A1F"],
  gradientAccent: ["#A3E635", "#10D98C"],
};

const oceanBreeze: Theme = {
  id: "ocean-breeze",
  name: "Ocean Breeze",
  mode: "light",
  statusBar: "dark",

  primary: "#0A84FF",
  primaryLight: "#8CC8FF",
  primaryDark: "#0063CC",
  onPrimary: "#FFFFFF",
  secondary: "#06B6D4",
  accent: "#6366F1",

  textPrimary: "#0B1F33",
  textSecondary: "#4D6A85",
  textDark: "#071524",
  textMuted: "#8AA2B8",
  placeholderText: "#93AABF",
  link: "#0A6FDB",

  background: "#F3F9FF",
  backgroundAlt: "#E7F2FD",
  cardBackground: "#FFFFFF",
  cardElevated: "#FFFFFF",
  inputBackground: "#EAF3FC",
  overlay: "rgba(7, 21, 36, 0.5)",

  border: "#D2E3F3",
  borderFocus: "#0A84FF",
  divider: "#E1EDF8",
  shadow: "#1D4E89",

  tabBarBackground: "#FFFFFF",
  tabBarActive: "#0A84FF",
  tabBarInactive: "#9DB4C9",

  success: "#059669",
  warning: "#D97706",
  error: "#E11D48",
  info: "#0284C7",

  white: "#FFFFFF",
  black: "#000000",

  gradientPrimary: ["#0A84FF", "#06B6D4"],
  gradientBackground: ["#F3F9FF", "#DCEEFF"],
  gradientAccent: ["#6366F1", "#0A84FF"],
};

const roseQuartz: Theme = {
  id: "rose-quartz",
  name: "Rose Quartz",
  mode: "light",
  statusBar: "dark",

  primary: "#E5176F",
  primaryLight: "#F7A1C4",
  primaryDark: "#B50E56",
  onPrimary: "#FFFFFF",
  secondary: "#9D4EDD",
  accent: "#FF8A5C",

  textPrimary: "#2A1020",
  textSecondary: "#7B5468",
  textDark: "#1E0A16",
  textMuted: "#AE8CA0",
  placeholderText: "#BB9CAD",
  link: "#C2185B",

  background: "#FFF5F9",
  backgroundAlt: "#FFE9F2",
  cardBackground: "#FFFFFF",
  cardElevated: "#FFFFFF",
  inputBackground: "#FFEDF4",
  overlay: "rgba(42, 16, 32, 0.5)",

  border: "#F6D3E2",
  borderFocus: "#E5176F",
  divider: "#FAE0EC",
  shadow: "#A3185A",

  tabBarBackground: "#FFFFFF",
  tabBarActive: "#E5176F",
  tabBarInactive: "#CDA9BC",

  success: "#15A06A",
  warning: "#E08A00",
  error: "#D91E36",
  info: "#6D5BD0",

  white: "#FFFFFF",
  black: "#000000",

  gradientPrimary: ["#E5176F", "#9D4EDD"],
  gradientBackground: ["#FFF5F9", "#FFDDEB"],
  gradientAccent: ["#FF8A5C", "#E5176F"],
};

const obsidianGold: Theme = {
  id: "obsidian-gold",
  name: "Obsidian Gold",
  mode: "dark",
  statusBar: "light",

  primary: "#E2B84A",
  primaryLight: "#F3D98C",
  primaryDark: "#B8902A",
  onPrimary: "#1A1304",
  secondary: "#C9A227",
  accent: "#F5E6B8",

  textPrimary: "#F8F2E4",
  textSecondary: "#B3A88D",
  textDark: "#16110A",
  textMuted: "#7D7461",
  placeholderText: "#776F5C",
  link: "#F3D98C",

  background: "#080808",
  backgroundAlt: "#0E0E0D",
  cardBackground: "#151412",
  cardElevated: "#1D1B17",
  inputBackground: "#191815",
  overlay: "rgba(0, 0, 0, 0.8)",

  border: "#2D2A22",
  borderFocus: "#E2B84A",
  divider: "#211F1A",
  shadow: "#000000",

  tabBarBackground: "#0B0B0A",
  tabBarActive: "#E2B84A",
  tabBarInactive: "#5E5848",

  success: "#6FCF97",
  warning: "#F2994A",
  error: "#EB5757",
  info: "#7AB8F5",

  white: "#FFFFFF",
  black: "#000000",

  gradientPrimary: ["#F3D98C", "#B8902A"],
  gradientBackground: ["#080808", "#1C1710"],
  gradientAccent: ["#F5E6B8", "#E2B84A"],
};

const cyberNeon: Theme = {
  id: "cyber-neon",
  name: "Cyber Neon",
  mode: "dark",
  statusBar: "light",

  primary: "#FF2E93",
  primaryLight: "#FF8CC4",
  primaryDark: "#D10F70",
  onPrimary: "#FFFFFF",
  secondary: "#8B5CF6",
  accent: "#00F0FF",

  textPrimary: "#FBEFFF",
  textSecondary: "#BDA3D6",
  textDark: "#12041F",
  textMuted: "#7E6498",
  placeholderText: "#7A5F94",
  link: "#00F0FF",

  background: "#0D0221",
  backgroundAlt: "#12042D",
  cardBackground: "#1A0A3A",
  cardElevated: "#240F4D",
  inputBackground: "#1F0D42",
  overlay: "rgba(8, 1, 20, 0.78)",

  border: "#3A1D6E",
  borderFocus: "#00F0FF",
  divider: "#2A1450",
  shadow: "#FF2E93",

  tabBarBackground: "#0F0328",
  tabBarActive: "#FF2E93",
  tabBarInactive: "#6B4F8C",

  success: "#2CFF9A",
  warning: "#FFD60A",
  error: "#FF4D6D",
  info: "#00F0FF",

  white: "#FFFFFF",
  black: "#000000",

  gradientPrimary: ["#FF2E93", "#8B5CF6"],
  gradientBackground: ["#0D0221", "#2B0A5E"],
  gradientAccent: ["#00F0FF", "#FF2E93"],
};

export const themes: Theme[] = [
  midnightAurora,
  solarFlare,
  emeraldNoir,
  oceanBreeze,
  roseQuartz,
  obsidianGold,
  cyberNeon,
];

export const DEFAULT_THEME_ID = midnightAurora.id;

export const getThemeById = (id: string | null | undefined): Theme =>
  themes.find((t) => t.id === id) ?? midnightAurora;

/** Shared, theme-independent design tokens so spacing/shape stay consistent. */
export const tokens = {
  radius: { sm: 8, md: 12, lg: 16, xl: 24, pill: 999 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
  fontSize: { xs: 12, sm: 14, md: 16, lg: 18, xl: 22, xxl: 28, display: 36 },
} as const;

// Proceed to pick preferred theme here

export const THEME = emeraldNoir;
