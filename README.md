# App Starter Template

A production-ready React Native Expo starter template with authentication, theming, and file-based routing. Clone this repository to kickstart your next mobile app.

## Features

- **Expo Router v5** - File-based routing with typed routes
- **Authentication Flow** - Login, signup, email verification, forgot password
- **Secure Token Storage** - Using `expo-secure-store` with platform-specific keychain options
- **Zustand State Management** - Lightweight global auth store
- **Multi-Theme System** - 6 beautiful themes with design tokens (spacing, radius, typography)
- **TypeScript Strict Mode** - Full type safety across the codebase
- **React Native Reanimated** - Smooth tab bar animations
- **Safe Area Handling** - Proper insets for notches, home indicators, status bars
- **Keyboard-Aware Forms** - `KeyboardAvoidingView` + `ScrollView` on all auth screens

## Quick Start

### Prerequisites

- Node.js 20+
- npm / yarn / pnpm
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (macOS) or Android Emulator

### Installation

```bash
# Clone the template
git clone <your-repo-url> my-new-app
cd my-new-app

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env and set BACKEND_URL=https://your-api.example.com

# Start development server
npm start
```

### Environment Variables

Create a `.env` file from `.env.example`:

```env
BACKEND_URL=https://your-api.example.com
```

> **Important**: The app will not connect to a real backend until you set `BACKEND_URL` and disable mock mode (see [Configuration](#configuration)).

## Project Structure

```
src/
├── app/                    # Expo Router pages (file-based routing)
│   ├── _layout.tsx         # Root layout: auth guards, splash screen
│   ├── (auth)/             # Auth group (public routes)
│   │   ├── _layout.tsx     # Auth stack with route guards
│   │   ├── index.tsx       # Login screen
│   │   ├── signup.tsx      # Registration screen
│   │   ├── verify-email.tsx# OTP verification
│   │   └── forgot-password.tsx
│   └── (tabs)/             # Protected app group
│       ├── _layout.tsx     # Tab navigator + custom TabBar
│       ├── home.tsx
│       ├── search.tsx
│       └── settings.tsx
├── components/
│   ├── SafeScreen.tsx      # Wrapper: safe area insets + status bar + background
│   └── TabBar.tsx          # Animated custom tab bar (Reanimated)
├── lib/
│   ├── env.ts              # Validated environment config
│   └── themes.ts           # Theme definitions + design tokens
├── store/
│   └── useAuth.ts          # Zustand auth store + API client
├── styles/                 # StyleSheet.create per screen
│   ├── auth.ts
│   ├── home.ts
│   ├── search.ts
│   └── settings.ts
└── types/
    └── index.ts            # Shared TypeScript interfaces
```

## Configuration

### 1. Backend API

The template expects a REST API with these endpoints:

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | `/api/register` | `{firstName, lastName, userName, email, password}` | `{user, token}` |
| POST | `/api/login` | `{email, password}` | `{user, token}` |
| GET | `/api/me` | (Authorization header) | `{user}` |
| POST | `/api/verify-email` | `{code}` | `{success: true}` |
| POST | `/api/resend-verification` | `{email}` | `{success: true}` |
| POST | `/api/forgot-password` | `{email}` | `{success: true}` |

**User object** (from `/api/me` and auth responses):

```ts
interface User {
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  imageUrl?: string | null;
  isVerified: boolean;
  createdAt: string; // ISO date string
}
```

### 2. Disable Mock Mode

In `src/store/useAuth.ts`, change line 9:

```ts
// For testing purpose
const USE_MOCK = false; // <-- Set to false for production
```

When `USE_MOCK = true` (default), the app uses hardcoded mock users and fake delays. **Never ship with mock mode enabled.**

### 3. Theme Selection

In `src/lib/themes.ts`, line 419:

```ts
export const THEME = emeraldNoir; // Change to any exported theme
```

Available themes: `midnightAurora`, `solarFlare`, `emeraldNoir`, `oceanBreeze`, `roseQuartz`, `obsidianGold`, `cyberNeon`.

> **Note**: Runtime theme switching is not yet implemented. The theme is compiled in. See [Roadmap](#roadmap).

### 4. App Identity

Edit `app.json`:
- `name`, `slug`, `version`
- `scheme` (for deep links)
- `icon`, `splash` images in `assets/images/`

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo dev server |
| `npm run android` | Open in Android emulator |
| `npm run ios` | Open in iOS simulator |
| `npm run web` | Run in browser |
| `npm run lint` | Run ESLint (Expo config) |
| `npm run reset-project` | Reset to blank template |

## Authentication Flow

```
App Start
    │
    ▼
checkAuth() ──────► Token in SecureStore?
    │                    │
    │ No                 │ Yes
    ▼                    ▼
isInitializing=false   GET /api/me
    │                    │
    │                    ├── 200 OK ──► user + token stored
    │                    │
    │                    └── 401/403 ──► Token deleted
    │
    ▼
isVerified?
    │
    ├── true  ──► (tabs) stack (home, search, settings)
    │
    └── false ──► (auth) stack
                      │
                      ├── No user ──► Login / Signup / Forgot Password
                      │
                      └── User exists, not verified ──► Verify Email
```

### Route Guards

- `Stack.Protected guard={isVerified}` — Only verified users see `(tabs)`
- `Stack.Protected guard={!isVerified}` — Everyone else sees `(auth)`
- Inside `(auth)`: `guard={!user}` for login/signup, `guard={!!user && !user.isVerified}` for verify-email

## Theming System

### Design Tokens

```ts
// src/lib/themes.ts
export const tokens = {
  radius: { sm: 8, md: 12, lg: 16, xl: 24, pill: 999 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
  fontSize: { xs: 12, sm: 14, md: 16, lg: 18, xl: 22, xxl: 28, display: 36 },
} as const;
```

Usage:

```tsx
import { THEME, tokens } from '@/lib/themes';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.xl,
    backgroundColor: THEME.cardBackground,
  },
  title: {
    fontSize: tokens.fontSize.xl,
    color: THEME.textPrimary,
  },
});
```

### Theme Object Structure

Each theme contains 50+ color tokens covering:
- Primary/secondary/accent with light/dark variants
- Text colors (primary, secondary, muted, placeholder, link)
- Backgrounds (base, alt, card, elevated, input, overlay)
- Borders, dividers, shadows
- Tab bar specific colors
- Semantic colors (success, warning, error, info)
- Gradients (primary, background, accent)

## Adding New Screens

### Protected Tab Screen

1. Create `src/app/(tabs)/new-screen.tsx`
2. Add to `src/app/(tabs)/_layout.tsx`:

```tsx
<Tabs.Screen name="new-screen" options={{ title: 'New Screen' }} />
```

3. Add icon in `TabBar.tsx` `getIcon()` function.

### Auth Screen

1. Create `src/app/(auth)/new-screen.tsx`
2. Add to `src/app/(auth)/_layout.tsx` with appropriate guard.

## Common Customizations

### Change Primary Color

Edit the theme in `src/lib/themes.ts` or create a new theme object.

### Add Custom Font

1. Add font files to `assets/fonts/`
2. Use `expo-font` in `app/_layout.tsx`:

```tsx
import { useFonts } from 'expo-font';

const [fontsLoaded] = useFonts({
  'MyFont-Regular': require('@/assets/fonts/MyFont-Regular.ttf'),
  'MyFont-Bold': require('@/assets/fonts/MyFont-Bold.ttf'),
});

if (!fontsLoaded) return null;
```

### Enable Biometric Auth

The token is stored with `WHEN_UNLOCKED_THIS_DEVICE_ONLY` (iOS) / equivalent Android protection. For explicit biometric prompts, add `expo-local-authentication`.

## Known Limitations / Roadmap

- [ ] **Runtime theme switching** — ThemeContext + AsyncStorage persistence
- [ ] **Token refresh / auto-logout** — Axios interceptor or fetch wrapper with 401 handling
- [ ] **Google / Apple Sign-In** — Replace TODO in login/signup screens
- [ ] **Push notifications** — `expo-notifications` setup
- [ ] **Offline support** — `react-query` / `tanstack-query` + persistence
- [ ] **E2E tests** — Detox / Maestro configuration
- [ ] **Storybook** — Component documentation
- [ ] **CI/CD** — EAS Build + GitHub Actions workflow

## Troubleshooting

### "BACKEND_URL is undefined"

Ensure `.env` exists and contains `BACKEND_URL=...`. Restart the dev server after changes.

### Splash screen never hides

`checkAuth()` must complete. Check SecureStore permissions and network connectivity.

### Tab bar icons not showing

Ensure `@expo/vector-icons` font is loaded (automatic in Expo SDK 57+).

### TypeScript errors after adding files

Run `npx tsc --noEmit` to verify. Restart TS server in VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server".

## License

MIT — See [LICENSE](LICENSE) for details.

---

**Happy coding!** 🚀 If you improve this template, consider contributing back.