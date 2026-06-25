import { useGroceryStore } from "@/app/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    padding: 16,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  statLabel: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.textMuted,
    marginTop: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statNumber: {
    fontSize: 25,
    fontFamily: FONTS.extraBold,
    color: COLORS.text,
    marginTop: 4,
  },
  completionCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    padding: 16,
  },
  completionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  completionLabel: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
  },
  completionPercentage: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
  progressBarContainer: {
    marginTop: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: COLORS.secondary,
    overflow: "hidden",
  },
  progressBar: {
    height: 12,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
});

export default function InsightsStatsSection() {
  const { items } = useGroceryStore();

  const totalItems = items.length;
  const completedItems = items.filter((item) => item.purchased).length;
  const pendingItems = totalItems - completedItems;
  const completionRate = totalItems
    ? Math.round((completedItems / totalItems) * 100)
    : 0;

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={styles.iconContainer}>
            <FontAwesome6 name="clock" size={18} color={COLORS.white} />
          </View>
          <Text style={styles.statLabel}>Pending</Text>
          <Text style={styles.statNumber}>{pendingItems}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.iconContainer}>
            <FontAwesome6 name="check" size={18} color={COLORS.white} />
          </View>
          <Text style={styles.statLabel}>Completed</Text>
          <Text style={styles.statNumber}>{completedItems}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.iconContainer}>
            <FontAwesome6 name="layer-group" size={18} color={COLORS.white} />
          </View>
          <Text style={styles.statLabel}>Total</Text>
          <Text style={styles.statNumber}>{totalItems}</Text>
        </View>
      </View>

      <View style={styles.completionCard}>
        <View style={styles.completionHeader}>
          <Text style={styles.completionLabel}>Completion rate</Text>
          <Text style={styles.completionPercentage}>{completionRate}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${Math.max(2, completionRate)}%`,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}