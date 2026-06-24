import { useUser } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";
import BackgroundDecor from "@/components/BackgroundDecor";
import CompletedItems from "@/components/list/CompletedItems";
import PendingItemCard from "@/components/list/PendingItems";
import { useGroceryStore } from "@/app/store/grocery-store";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
export default function HomeScreen() {
  const { user } = useUser();
  const firstName = user?.firstName ?? "there";
  const { items, loadItems, isLoading } = useGroceryStore();

  const pendingItems = items.filter((item) => !item.purchased);
  const completedCount = items.length - pendingItems.length;
  const progress = items.length
    ? Math.round((completedCount / items.length) * 100)
    : 0;
      useEffect(() => {
      loadItems();
    }, []);
  console.log("Total Items:", items.length);
  console.log("Pending Items:", pendingItems.length);
  if (isLoading) {
  return (
    <LinearGradient
      colors={COLORS.gradientPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.root}
    >
      <BackgroundDecor />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loader}>
  <ActivityIndicator
    size="large"
    color={COLORS.primary}
  />
</View>
      </SafeAreaView>
    </LinearGradient>
  );
}
  return (
    <LinearGradient
      colors={COLORS.gradientPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.root}
    >
      <BackgroundDecor />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.eyebrow}>TODAY</Text>
            <Text style={styles.header}>Your Grocery Board</Text>

            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.status}>{pendingItems.length} pending </Text>
              <View style={styles.statusDot} />
              <Text style={styles.status}> {completedCount} completed</Text>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressLabel}>{progress}%</Text>
            </View>
          </View>

          <View style={styles.listSection}>
            <View style={styles.listHeaderRow}>
              <Text style={styles.listHeaderText}>Shopping items</Text>
              <Text style={styles.listHeaderCount}>{pendingItems.length} active</Text>
            </View>

            {pendingItems.length ? (
              <View style={styles.listGap}>
                {pendingItems.map((item) => (
                  <PendingItemCard key={item.id} item={item} />
                ))}
              </View>
            ) : (
              <Text style={styles.emptyText}>All caught up — nothing pending.</Text>
            )}
          </View>

          <CompletedItems />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  loader: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  eyebrow: {
    color: COLORS.boardText,
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    letterSpacing: 1.5,
  },
  header: {
    color: COLORS.boardText,
    fontFamily: FONTS.extraBold,
    fontSize: 28,
    marginTop: 6,
  },
  status: {
    color: COLORS.boardText,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    padding: 1,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 50,
    backgroundColor: COLORS.secondary,
    marginRight: 8,
  },
  progressSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  progressTrack: {
    flex: 1,
    height: 9,
    backgroundColor: COLORS.boardTrack,
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.darkOverlay,
  },
  progressLabel: {
    color: COLORS.boardText,
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    marginLeft: 10,
  },
  listSection: {
    marginTop: 24,
  },
  listHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  listHeaderText: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: COLORS.textSecondary,
  },
  listHeaderCount: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
  },
  listGap: {
    marginTop: 14,
    gap: 14,
  },
  emptyText: {
    marginTop: 14,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: "center",
  },
});