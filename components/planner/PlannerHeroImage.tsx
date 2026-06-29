import { Image, StyleSheet, Dimensions, View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-reanimated-carousel";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";

const CAROUSEL_WIDTH = Dimensions.get("window").width - 40;

const categories = [
  {
    image: require("@/assets/images/fruits.png"),
    title: "Fresh Fruits",
    benefit: "Packed with vitamins, fiber, and natural antioxidants.",
  },
  {
    image: require("@/assets/images/vegetables.png"),
    title: "Vegetables",
    benefit: "Loaded with fiber, minerals, and disease-fighting nutrients.",
  },
  {
    image: require("@/assets/images/greens.png"),
    title: "Leafy Greens",
    benefit: "Rich in iron, calcium, and immune-boosting vitamins.",
  },
  {
    image: require("@/assets/images/diary.png"),
    title: "Dairy",
    benefit: "Great source of calcium and protein for strong bones.",
  },
  {
    image: require("@/assets/images/meat.png"),
    title: "Meat",
    benefit: "High-quality protein that supports muscle and energy.",
  },
  {
    image: require("@/assets/images/seafood.png"),
    title: "Seafood",
    benefit: "Omega-3 fatty acids that support heart and brain health.",
  },
  {
    image: require("@/assets/images/wheats.png"),
    title: "Whole Grains",
    benefit: "Provides fiber and steady energy throughout the day.",
  },
];

const PlannerHeroImage = () => {
  return (
    <LinearGradient
      colors={COLORS.gradientAccent}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Carousel
        width={CAROUSEL_WIDTH}
        height={224}
        data={categories}
        loop
        autoPlay
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.textWrap}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.benefit}>{item.benefit}</Text>
            </View>
          </View>
        )}
      />

      <LinearGradient
        pointerEvents="none"
        colors={["rgba(0,0,0,0.1)", "transparent"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.topGradient}
      />

      <LinearGradient
        pointerEvents="none"
        colors={["transparent", "rgba(0,0,0,0.1)"]}
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
    borderColor: COLORS.primaryLight,
    backgroundColor: COLORS.card,

  },
  slide: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 16,
  },
  image: {
    width: 150,
    height: 150,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.primaryDark,
    marginBottom: 6,
    textShadowColor: "#1B5E20",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  benefit: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color:COLORS.benefits,
    lineHeight: 18,
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