import { View, Text } from "react-native";
import { StyleSheet, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import PlannerFormCard from "@/components/planner/PlannerFormCard";
import PlannerHeroImage from "@/components/planner/PlannerHeroImage";
import { useGroceryStore } from "@/app/store/grocery-store";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";

const PlannerScreen = () => {
  const { items, loadItems } = useGroceryStore();

  useEffect(() => {
    loadItems();
  }, []);

  const pendingCount = items.filter((item) => !item.purchased).length;
  const highPriorityCount = items.filter(
    (item) => !item.purchased && item.priority === "high"
  ).length;
  const totalQuantity = items
    .filter((item) => !item.purchased)
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.gradient}>
      <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "padding" : undefined}
>
  <ScrollView
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
          {/* Header Card */}
      <ImageBackground
        source={require("@/assets/images/planner.png")}
        style={styles.headerCard}
        imageStyle={styles.headerCardImage}
        resizeMode="cover"
      >
        <View style={styles.headerCardOverlay} />
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.headerLabel}>Grocery planner</Text>
            <Text style={styles.headerTitle}>Plan smarter, shop calmer.</Text>
            <Text style={styles.headerDescription}>
              Organize your next grocery run with categories, quantities, and
              priority in one place.
            </Text>
          </View>
        </View>

       
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={styles.statValue}>{pendingCount}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>High Priority</Text>
            <Text style={styles.statValue}>{highPriorityCount}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Units</Text>
            <Text style={styles.statValue}>{totalQuantity}</Text>
          </View>
        </View>
      </ImageBackground>

      
      <PlannerHeroImage />

    
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>Build your list</Text>
        <Text style={styles.sectionDescription}>
          Add items with the right quantity, category, and urgency.
        </Text>
      </View>

   
      <PlannerFormCard/>
     </ScrollView>
 </KeyboardAvoidingView>

    </View>
  );
};

export default PlannerScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
  },
  headerCard: {
    gap: 16,
    borderRadius: 24,
    backgroundColor: COLORS.card,
    padding: 20,
    overflow: "hidden",
    marginTop:45
  },
  headerCardImage: {
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.primaryDark,
  },
  headerCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 24,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  headerText: {
    flex: 1,
    paddingRight: 16,
    
  },
  headerLabel: {
    fontSize: 11,
    fontFamily: FONTS.semiBold,
    letterSpacing: 1.2,
    color: "rgba(255,255,255,0.9)",
    textTransform: "uppercase",
    textShadowColor: "#1B5E20",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  headerTitle: {
    marginTop: 4,
    fontSize: 28,
    fontFamily: FONTS.bold,
    lineHeight: 36,
    color: COLORS.white,
     textShadowColor: "#1B5E20",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  headerDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(255,255,255,0.9)",
  
  },
  statsGrid: {
    flexDirection: "row",
    gap: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 12,
  },
  statLabel: {
    fontSize: 9,
    fontFamily: FONTS.semiBold,
    letterSpacing: 1,
    color: "rgba(255,255,255,0.8)",
    textTransform: "uppercase",
  },
  statValue: {
    marginTop: 4,
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  sectionHeader: {
    paddingHorizontal: 4,
  },
  sectionLabel: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    letterSpacing: 1,
    color: COLORS.secondary,
    textTransform: "uppercase",
  },
  sectionDescription: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.textMuted,
  },
});