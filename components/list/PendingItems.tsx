import { GroceryItem, useGroceryStore } from "@/app/store/grocery-store";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View} from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PRIORITY_STYLES = {
  low: {
    bg: COLORS.priorityLowLight,
    text: COLORS.priorityLow,
    border: COLORS.priorityLowBorder,
  },
  medium: {
    bg: COLORS.priorityMediumLight,
    text: COLORS.priorityMedium,
    border: COLORS.priorityMediumBorder,
  },
  high: {
    bg: COLORS.priorityHighLight,
    text: COLORS.priorityHigh,
    border: COLORS.priorityHighBorder,
  },
};

const PendingItemCard = ({ item }: { item: GroceryItem }) => {
  const { removeItem, updateQuantity, togglePurchased } = useGroceryStore();
  const priority = PRIORITY_STYLES[item.priority];

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Pressable style={styles.checkCircle} onPress={() => togglePurchased(item.id)} />

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View
            style={[
              styles.priorityPill,
              {
                backgroundColor: priority.bg,
                borderColor: priority.border,
              },
            ]}
>
  <Text
    style={[
      styles.priorityText,
      {
        color: priority.text,
      },
    ]}
  >
    {item.priority.toUpperCase()}
  </Text>
</View>
          </View>

          <View style={styles.categoryRow}>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          </View>

          <View style={styles.quantityRow}>
            <Pressable
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            >
              <FontAwesome6 name="minus" size={12} color={COLORS.textMuted} />
            </Pressable>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <Pressable
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <FontAwesome6 name="plus" size={12} color={COLORS.textMuted} />
            </Pressable>
          </View>
        </View>

       <Pressable
        style={styles.deleteButton}
        onPress={() => removeItem(item.id)}
      >
       <MaterialCommunityIcons name="delete" size={24} color="black" style={styles.deleteIcon}/>
      </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    backgroundColor: COLORS.card,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  checkCircle: {
    marginTop: 4,
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
  },
  priorityPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: StyleSheet.hairlineWidth,
  },
  priorityText: {
    fontSize: 11,
    fontFamily: FONTS.bold,
    textTransform: "uppercase",
  },
  categoryRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryPill: {
    borderRadius: 999,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
  },
  quantityRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityButton: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  quantityText: {
    minWidth: 36,
    textAlign: "center",
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
  },
  deleteButton: {
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },
   deleteIcon: {
  width: 30,
  height:30,
  color:COLORS.primaryDark,
  
}
});

export default PendingItemCard;