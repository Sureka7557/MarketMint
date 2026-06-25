import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/constants/COLORS";

const PlannerHeroImage = () => {
  return (
    <LinearGradient
      colors={COLORS.gradientAccent}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image
        source={require("../../assets/images/hero.png")}
        style={styles.image}
        resizeMode="cover"
      />
      
    
      <LinearGradient
        pointerEvents="none"
        colors={["rgba(0,0,0,0.4)", "transparent"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.topGradient}
      />
     
      <LinearGradient
        pointerEvents="none"
        colors={["transparent", "rgba(0,0,0,0.4)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.bottomGradient}
      />
    </LinearGradient>
  );
};

export default PlannerHeroImage;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  image: {
    height: 224,
    width: "100%",
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 72,
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
  },
});