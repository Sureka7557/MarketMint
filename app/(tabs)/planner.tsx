import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import PlannerFormCard from "@/components/planner/PlannerFormCard";
import PlannerHeroImage from "@/components/planner/PlannerHeroImage";
import BackgroundDecor from "@/components/BackgroundDecor";
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
    <LinearGradient
      colors={COLORS.gradientPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <BackgroundDecor />
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
      <View style={styles.headerCard}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.headerLabel}>Grocery planner</Text>
            <Text style={styles.headerTitle}>Plan smarter, shop calmer.</Text>
            <Text style={styles.headerDescription}>
              Organize your next grocery run with categories, quantities, and
              priority in one place.
            </Text>
          </View>
          <View style={styles.headerIcon}>
            <FontAwesome6 name="wand-magic-sparkles" size={18} color={COLORS.white} />
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
      </View>

      
      <PlannerHeroImage />

    
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>Build your list</Text>
        <Text style={styles.sectionDescription}>
          Add items with the right quantity, category, and urgency.
        </Text>
      </View>

   
      <PlannerFormCard />
     </ScrollView>
 </KeyboardAvoidingView>

    </LinearGradient>
  );
};

export default PlannerScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
  },
  headerCard: {
    gap: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    padding: 20,
   
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
    color: COLORS.textMuted,
    textTransform: "uppercase",
  },
  headerTitle: {
    marginTop: 4,
    fontSize: 28,
    fontFamily: FONTS.bold,
    lineHeight: 36,
    color: COLORS.text,
  },
  headerDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textMuted,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.darkCard,
    padding: 12,
  },
  statLabel: {
    fontSize: 9,
    fontFamily: FONTS.semiBold,
    letterSpacing: 1,
    color: COLORS.textMuted,
    textTransform: "uppercase",
  },
  statValue: {
    marginTop: 4,
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.text,
  },
  sectionHeader: {
    paddingHorizontal: 4,
  },
  sectionLabel: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    letterSpacing: 1,
    color: COLORS.white,
    textTransform: "uppercase",
  },
  sectionDescription: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.white,
  },
});