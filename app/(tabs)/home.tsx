import { useClerk, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";
import BackgroundDecor from "@/components/BackgroundDecor";

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const onSignOutPress = async () => {
    setSigningOut(true);
    try {
      await signOut();
      router.replace("/");
    } catch (err) {
      console.log("Sign out error:", err);
      setSigningOut(false);
    }
  };

  return (
    <LinearGradient
      colors={COLORS.gradientPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.safeArea}
    >
      <BackgroundDecor />

      <SafeAreaView style={styles.safeAreaInner}>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Home</Text>
          <Pressable
            onPress={onSignOutPress}
            disabled={signingOut}
            style={styles.signOutIcon}
          >
            <Ionicons
              name="log-out-outline"
              size={24}
              color={COLORS.primary}
            />
          </Pressable>
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={32} color={COLORS.primary} />
          </View>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.emailText}>
            {user?.primaryEmailAddress?.emailAddress || "User"}
          </Text>
        </View>

        {/* Content Area */}
        <View style={styles.contentArea}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          {/* Add your home screen content here */}
        </View>

        {/* Sign Out Loading */}
        {signingOut && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator color={COLORS.primary} size="large" />
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

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