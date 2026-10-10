// src/components/TabBar.tsx
import { THEME, tokens } from "@/lib/themes";
import { Feather } from "@expo/vector-icons";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, { bottom: insets.bottom + 20 }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <AnimatedTouchableOpacity
            layout={LinearTransition.springify().mass(0.5)}
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            activeOpacity={0.8}
            style={[
              styles.tab,
              { backgroundColor: isFocused ? THEME.white : "transparent" },
            ]}
          >
            {getIcon(route.name, isFocused ? THEME.primary : "white")}
            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(50)}
                style={styles.text}
              >
                {route.name}
              </Animated.Text>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );

  function getIcon(routeName: string, color: string) {
    switch (routeName) {
      case "home":
        return <Feather name="home" size={20} color={color} />;
      case "settings":
        return <Feather name="settings" size={20} color={color} />;
      case "search":
        return <Feather name="search" size={20} color={color} />;
      default:
        return null;
    }
  }
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    flexDirection: "row",
    height: 70,
    backgroundColor: THEME.secondary,
    width: "80%",
    borderRadius: tokens.radius.pill,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 12,
  },
  tab: {
    flexDirection: "row",
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 14,
    borderRadius: tokens.radius.pill,
  },
  text: {
    color: THEME.primary,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
