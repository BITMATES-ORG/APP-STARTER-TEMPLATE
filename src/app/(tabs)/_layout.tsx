import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
    </Tabs>
  );
};
export default TabsLayout;
