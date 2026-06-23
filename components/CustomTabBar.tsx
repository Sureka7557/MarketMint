import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";

const ICONS: Record<
  string,
  { Comp: any; name: string; size: number }
> = {
  home: { Comp: FontAwesome5, name: "clipboard-list", size: 24 },
  planner: { Comp: Feather, name: "plus-circle", size: 26 },
  insights: { Comp: Entypo, name: "bar-graph", size: 24 },
};

const LABELS: Record<string, string> = {
  home: "List",
  planner: "Planner",
  insights: "Insights",
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        { paddingBottom: Math.max(insets.bottom, 12) },
      ]}
    >
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          // Hide routes marked with href: null (e.g. index)
          const { options } = descriptors[route.key];
          if ((options as any).href === null) return null;

          const isFocused = state.index === index;
          const icon = ICONS[route.name];
          if (!icon) return null;
          const { Comp, name, size } = icon;

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
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              hitSlop={8}
            >
              <View
                style={[
                  styles.tabContent,
                  isFocused && styles.tabContentActive,
                  
                ]}
              >
                <Comp
                  name={name}
                  size={size}
                  color={isFocused ? COLORS.primary : COLORS.textMuted}
                
                  
                />
                <Text
                  style={[
                    styles.label,
                    isFocused ? styles.labelActive : styles.labelInactive,
                  ]}
                >
                  {LABELS[route.name]}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.card,
    borderRadius: 32,
    width: "70%",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
 tabContent: {
  width: 95,
  height: 52,

  alignItems: "center",
  justifyContent: "center",

  borderRadius: 999,
  backgroundColor: "transparent",
},
  tabContentActive: {
 backgroundColor: "rgba(255,255,255,0.12)",
  borderRadius: 999,
},
  label: {
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
  labelActive: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  labelInactive: {
    color: COLORS.textMuted,
  },
});