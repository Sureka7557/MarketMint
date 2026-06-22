import { StyleSheet, View } from "react-native";
import { COLORS } from "@/constants/COLORS";

export default function BackgroundDecor() {
  return (
    <>
      <View style={styles.circleTopRight} pointerEvents="none" />
      <View style={styles.circleBottomLeft} pointerEvents="none" />
    </>
  );
}

const styles = StyleSheet.create({
  circleTopRight: {
    position: "absolute",
    width: 460,
    height: 460,
    borderRadius: 230,
    backgroundColor: COLORS.circleGradientBg,
    top: -140,
    right: -110,
  },
  circleBottomLeft: {
    position: "absolute",
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: COLORS.circleGradientBgSecondary,
    bottom: -120,
    left: -110,
  },
});