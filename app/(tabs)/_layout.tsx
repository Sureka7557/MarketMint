import { Tabs } from "expo-router";
import CustomTabBar from "@/components/CustomTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="home" />
      <Tabs.Screen name="planner" />
      <Tabs.Screen name="insights" />
    </Tabs>
  );
}