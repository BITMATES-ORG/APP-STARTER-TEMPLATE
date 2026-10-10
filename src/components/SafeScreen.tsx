import { THEME } from "@/lib/themes";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const SafeScreen = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: THEME.background,
      }}
    >
      {children}
      <StatusBar style={THEME.statusBar} />
    </View>
  );
};

export default SafeScreen;
