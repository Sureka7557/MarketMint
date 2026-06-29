import { FONTS } from "@/constants/FONTS";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Text, StyleSheet } from "react-native";

export default function GradientTitle() {
  return (
    <MaskedView
      maskElement={
        <Text style={styles.mainTitle}>
          MarketMint
        </Text>
      }
    >
      <LinearGradient
        colors={["#92D256", "#5E9930"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[styles.mainTitle, { opacity: 0 }]}>
          MarketMint
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 34,
    fontFamily:FONTS.bold,
    textAlign: "center",
    letterSpacing: 1,
    textShadowColor: "#0000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});