import React from 'react'
import { StyleSheet } from 'react-native'
import { useGroceryStore} from '../store/grocery-store'
import { LinearGradient } from 'expo-linear-gradient'
import BackgroundDecor from '@/components/BackgroundDecor'
import { COLORS } from '@/constants/COLORS'
import { FONTS } from '@/constants/FONTS'
const insights = () => {
  const {isLoading,items}=useGroceryStore()
  return (
      <LinearGradient
          colors={COLORS.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.safeArea}
        >
          <BackgroundDecor />
    
        </LinearGradient>
  )
}

export default insights

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  safeAreaInner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: FONTS.extraBold,
    color: COLORS.text,
  },
  signOutIcon: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  welcomeCard: {
    alignItems: "center",
    marginBottom: 32,
    paddingVertical: 24,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 4,
  },
  emailText: {
    fontSize: 14,
    color: COLORS.primaryLight,
    fontFamily: FONTS.regular,
  },
  contentArea: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 16,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlayDark,
    justifyContent: "center",
    alignItems: "center",
  },
});