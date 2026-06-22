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
        colors={["#22C55E", "#D4AF37"]}
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
    fontSize: 42,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 1,
  },
});