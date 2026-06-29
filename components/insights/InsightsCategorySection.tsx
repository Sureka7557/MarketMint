import { useGroceryStore } from "@/app/store/grocery-store";
import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";

const categoryColors: Record<string, string> = {
  Produce: "#74c49a",
  Dairy: "#8ec5ff",
  Bakery: "#f3bc84",
  Pantry: "#b69cff",
  Snacks: "#f3a1bd",
};

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
  headerSubtitle: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.textMuted,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  categoryItem: {
    marginTop: 12,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.text,
  },
  categoryCount: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
  },
  progressBarContainer: {
    overflow: "hidden",
    borderRadius: 999,
    backgroundColor: COLORS.white,
    height: 8,
    borderColor:"#807F7F",
    borderWidth:0.5
  },
  progressBar: {
    height: 8,
    borderRadius: 999,
  },
  emptyState: {
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
  },
});

export default function InsightsCategorySection() {
  const { items } = useGroceryStore();
  const total = items.length;

  const categories = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  const categoryEntries = Object.entries(categories).sort((a, b) => b[1] - a[1]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Items by category</Text>
        <Text style={styles.headerSubtitle}>
          {categoryEntries.length} groups
        </Text>
      </View>

      {categoryEntries.map(([category, count]) => {
        const widthPercent = total ? Math.max(10, Math.round((count / total) * 100)) : 10;

        return (
          <View key={category} style={styles.categoryItem}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryLabel}>{category}</Text>
              <Text style={styles.categoryCount}>{count}</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${widthPercent}%` as `${number}%`,
                    backgroundColor: categoryColors[category] ?? COLORS.primary,
                  },
                ]}
              />
            </View>
          </View>
        );
      })}

      {categoryEntries.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Add items to reveal your category mix.
          </Text>
        </View>
      ) : null}
    </View>
  );
}