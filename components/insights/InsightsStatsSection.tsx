import { useGroceryStore } from "@/app/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";

const styles = StyleSheet.create({
  bannerContainer: {
    borderRadius: 24,
    overflow: "hidden",
  
  },
  bannerImage: {
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.primaryDark,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 24,
  },
  content: {
    padding: 16,
    gap: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 16,
    height:150,
    width:100
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
    fontSize: 10,
    fontFamily: FONTS.semiBold,
    color: "rgba(255,255,255,0.85)",
    marginTop: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    textShadowColor: "#0000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: FONTS.extraBold,
    color: COLORS.white,
    marginTop: 4,
    textShadowColor: "#0000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  completionCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.15)",
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
    color: COLORS.white,
    textShadowColor: "#0000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  completionPercentage: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    textShadowColor: "#0000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  progressBarContainer: {
    marginTop: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
    borderColor: "rgba(255,255,255,0.4)",
    borderWidth: 0.5,
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
    <ImageBackground
      source={require("@/assets/images/banner.png")}
      style={styles.bannerContainer}
      imageStyle={styles.bannerImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
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
    </ImageBackground>
  );
}