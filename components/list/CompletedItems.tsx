import { useGroceryStore } from "@/app/store/grocery-store";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CompletedItems = () => {
  const { removeItem, togglePurchased, items } = useGroceryStore();
  const completedItems = items.filter((item) => item.purchased);

  if (!completedItems.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed</Text>
      {completedItems.map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={styles.left}>
            <Pressable
              onPress={() => togglePurchased(item.id)}
              style={styles.checkButton}
            >
              <FontAwesome6 name="check" size={12} color={COLORS.white} />
            </Pressable>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
          <Pressable
            onPress={() => removeItem(item.id)}
            style={styles.deleteButton}
          >
            <FontAwesome6 name="trash" size={12} color={COLORS.accent} />
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.secondary,
    padding: 16,
    marginBottom:70
  },
  header: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: COLORS.boardText,
  },
  row: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkButton: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: COLORS.primary,
  },
  itemName: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: COLORS.textMuted,
    textDecorationLine: "line-through",
  },
  deleteButton: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "rgba(220, 38, 38, 0.15)",
  },
});

export default CompletedItems;