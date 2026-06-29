import { useGroceryStore } from "@/app/store/grocery-store";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
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
                  style={styles.deleteButton}
                  onPress={() => removeItem(item.id)}
                >
                  <MaterialCommunityIcons name="delete" size={24} color="black" style={styles.deleteIcon}/>
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
    textShadowColor: "#0000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
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
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: COLORS.white,

  },
   deleteIcon: {
  width: 30,
  height:30,
  color:COLORS.primaryDark 
}
});

export default CompletedItems;