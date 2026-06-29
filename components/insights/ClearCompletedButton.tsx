import { useGroceryStore } from "@/app/store/grocery-store";
import { Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.buttonText,
  },
});

export default function ClearCompletedButton() {
  const { clearPurchased } = useGroceryStore();

  return (
    <Pressable style={styles.button} onPress={clearPurchased}>
      <Text style={styles.text}>Clear completed items</Text>
    </Pressable>
  );
}