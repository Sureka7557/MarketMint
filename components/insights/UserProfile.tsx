import { useAuth,useUser} from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, Text, View, StyleSheet } from "react-native";
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
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 999,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 1,
  },
  signedInLabel: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  displayName: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginTop: 4,
  },
  emailText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  signOutButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.error,
    alignItems: "center",
    justifyContent: "center",
  },
});

const UserProfile = () => {
  const { signOut} = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const email = user?.primaryEmailAddress?.emailAddress;
  const displayName = user?.fullName || email?.split("@")[0];

  const handleSignOut = async () => {
    try {
      await signOut();

      router.replace("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentRow}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user?.imageUrl }}
            style={styles.avatarImage}
          />
        </View>

        {/* User Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.signedInLabel}>Signed in as</Text>
          <Text style={styles.displayName}>{displayName}</Text>
          <Text style={styles.emailText}>{email}</Text>
        </View>

        {/* Sign Out Button */}
        <Pressable
          onPress={handleSignOut}
          style={styles.signOutButton}
        >
          <FontAwesome6
            name="right-from-bracket"
            size={13}
            color={COLORS.white}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default UserProfile;