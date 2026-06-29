import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useGroceryStore } from '../store/grocery-store'
import { COLORS } from '@/constants/COLORS'
import { FONTS } from '@/constants/FONTS'
import { SafeAreaView } from "react-native-safe-area-context";
import ClearCompletedButton from "@/components/insights/ClearCompletedButton";
import InsightsCategorySection from "@/components/insights/InsightsCategorySection";
import InsightsPrioritySection from "@/components/insights/InsightsPrioritySection";
import InsightsStatsSection from "@/components/insights/InsightsStatsSection";
import SentryFeedbackButton from "@/components/insights/SentryFeedbackButton";
import UserProfile from "@/components/insights/UserProfile";

const insights = () => {
  const { isLoading, items } = useGroceryStore()
  
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <UserProfile />

        <InsightsStatsSection />

        <InsightsCategorySection />

        <InsightsPrioritySection />

        <ClearCompletedButton />
      </ScrollView>
    </SafeAreaView>
  )
}

export default insights

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 120,
    gap: 20,
  },
 
});