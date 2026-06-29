import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { Tabs } from "expo-router";
import CustomTabBar from "@/components/CustomTabBar";

export default function TabsLayout() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, () => setIsKeyboardVisible(true));
    const hideSub = Keyboard.addListener(hideEvent, () => setIsKeyboardVisible(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <Tabs
      tabBar={(props) => (isKeyboardVisible ? null : <CustomTabBar {...props} />)}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="planner" />
      <Tabs.Screen name="insights" />
    </Tabs>
  );
}