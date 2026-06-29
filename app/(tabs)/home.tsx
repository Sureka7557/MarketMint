import { useUser } from "@clerk/clerk-expo";
import { ScrollView, StyleSheet, Image, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/COLORS";

import { FONTS } from "@/constants/FONTS";
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
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loader}>
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
      />
    </View>
      </SafeAreaView>
    </View>
  );
}
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          <LinearGradient
            colors={COLORS.gradientPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Image
              source={require("@/assets/images/Hero.png")}
              style={styles.cardCornerImage}
              resizeMode="contain"
            />

            <View style={styles.content}>
  <Text style={styles.eyebrow}>TODAY</Text>
  <Text style={styles.header}>Your Grocery Board</Text>

  <View style={styles.statusRow}>
    <View style={styles.statusDot_P} />
    <Text style={styles.status_P}>{pendingItems.length} pending</Text>

    <View style={styles.statusDot_C} />
    <Text style={styles.status_C}>{completedCount} completed</Text>
  </View>

  <View style={styles.progressSection}>
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressFill,
          { width: `${progress}%` },
        ]}
      />
    </View>
    <Text style={styles.progressLabel}>{progress}%</Text>
  </View>
            </View>
</LinearGradient>

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
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    borderRadius: 24,
    padding: 24,
    overflow: "hidden",
    position: "relative",
    minHeight: 170,
    borderWidth: 1,
    borderColor: COLORS.boardCardDark,
    shadowColor: COLORS.boardShadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  content: {
    width: "60%",
    zIndex: 2,
  },
  cardCornerImage: {
    position: "absolute",
    right: -20,
    top: -10,
    width: 280,
    height: 250,
    zIndex: 1,
  },
  eyebrow: {
    color: "black",
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    letterSpacing: 1.5,
    textShadowColor: "#0000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  header: {
    color: "black",
    fontFamily: FONTS.bold,
    fontSize: 20,
    marginTop: 6,
    textShadowColor: "#0000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  status_C: {
    color:  COLORS.text,
    fontFamily: FONTS.medium,
    fontSize: 12,
    textShadowColor: "#0000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginRight: 3,
  },
   status_P: {
    color:  COLORS.text,
    fontFamily: FONTS.medium,
    fontSize: 12,
    textShadowColor: "#0000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginRight: 3,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    padding: 1,
  },
  statusDot_C: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: COLORS.primaryDark,
    borderColor:COLORS.boardTrack,
    borderWidth: 1,
    marginRight: 3,
  },
    statusDot_P: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    borderColor:COLORS.boardTrack,
    borderWidth: 1,
    marginRight: 3,
   
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
    backgroundColor: COLORS.primaryDark,    
  },
  progressLabel: {
    color: COLORS.text,
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    marginLeft: 10,
    textShadowColor: "#0000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
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
    color: COLORS.textMuted,
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