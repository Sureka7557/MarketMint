import { useGroceryStore } from "@/app/store/grocery-store";
import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeActionBackground: {
    backgroundColor: COLORS.error,
  },
  badgeClearBackground: {
    backgroundColor: COLORS.success,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    textTransform: "uppercase",
    color: COLORS.buttonText,
  },
  priorityCount: {
    fontSize: 30,
    fontFamily: FONTS.extraBold,
    color: COLORS.text,
    marginTop: 8,
  },
  priorityMessage: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
    marginTop: 8,
  },
});

export default function InsightsPrioritySection() {
  const { items } = useGroceryStore();

  const highPriority = items.filter(
    (item) => item.priority === "high" && !item.purchased
  ).length;

  const highPriorityTone =
    highPriority === 0
      ? "Everything critical is covered."
      : "Handle these first for a smoother trip.";

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>High priority remaining</Text>
        <View
          style={[
            styles.badge,
            highPriority
              ? styles.badgeActionBackground
              : styles.badgeClearBackground,
          ]}
        >
          <Text style={styles.badgeText}>
            {highPriority ? "Action" : "Clear"}
          </Text>
        </View>
      </View>

      <Text style={styles.priorityCount}>{highPriority}</Text>
      <Text style={styles.priorityMessage}>{highPriorityTone}</Text>
    </View>
  );
}