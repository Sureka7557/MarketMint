import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";
import { useGroceryStore, GroceryCategory, GroceryPriority } from "@/app/store/grocery-store";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";

const CATEGORIES: GroceryCategory[] = ["Produce", "Dairy", "Bakery", "Pantry", "Snacks"];
const PRIORITIES: GroceryPriority[] = ["low", "medium", "high"];

interface CategoryOption {
  label: string;
  icon: string;
}

const categoryIcons: Record<GroceryCategory, string> = {
  Produce: "leaf",
  Dairy: "bottle-droplet",
  Bakery: "bread-slice",
  Pantry: "jar",
  Snacks: "cookie",
};

const PlannerFormCard = () => {
  const { addItem, isLoading, error } = useGroceryStore();
  
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [selectedCategory, setSelectedCategory] = useState<GroceryCategory>("Produce");
  const [selectedPriority, setSelectedPriority] = useState<GroceryPriority>("medium");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddItem = async () => {
    if (!itemName.trim()) {
      return;
    }

    const quantityNum = Math.max(1, parseInt(quantity) || 1);

    try {
      await addItem({
        name: itemName.trim(),
        category: selectedCategory,
        quantity: quantityNum,
        priority: selectedPriority,
      });

      setItemName("");
      setQuantity("1");
      setSelectedCategory("Produce");
      setSelectedPriority("medium");
      
     
      setSuccessMessage("Item added!");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.card, COLORS.darkCard]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
     
      <View style={styles.inputSection}>
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., Organic Apples"
          placeholderTextColor={COLORS.textMuted}
          value={itemName}
          onChangeText={setItemName}
          editable={!isLoading}
        />
      </View>

      
      <View style={styles.inputSection}>
        <Text style={styles.label}>Quantity</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, parseInt(quantity) - 1).toString())}
            disabled={isLoading}
          >
            <FontAwesome6 name="minus" size={16} color={COLORS.primary} />
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            value={quantity}
            onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ""))}
            keyboardType="number-pad"
            editable={!isLoading}
          />
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity((parseInt(quantity) + 1).toString())}
            disabled={isLoading}
          >
            <FontAwesome6 name="plus" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContent}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
              disabled={isLoading}
            >
              <FontAwesome6
                name={categoryIcons[category]}
                size={14}
                color={selectedCategory === category ? COLORS.white : COLORS.primary}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

     
      <View style={styles.inputSection}>
        <Text style={styles.label}>Priority</Text>
        <View style={styles.priorityContainer}>
          {PRIORITIES.map((priority) => (
            <TouchableOpacity
              key={priority}
              style={[
                styles.priorityButton,
                selectedPriority === priority && styles.priorityButtonActive,
                priority === "low" && styles.priorityLow,
                priority === "medium" && styles.priorityMedium,
                priority === "high" && styles.priorityHigh,
              ]}
              onPress={() => setSelectedPriority(priority)}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.priorityText,
                  selectedPriority === priority && styles.priorityTextActive,
                ]}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      
      {error && (
        <View style={styles.errorMessage}>
          <FontAwesome6 name="circle-exclamation" size={14} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

     
      {successMessage && (
        <View style={styles.successMessage}>
          <FontAwesome6 name="circle-check" size={14} color={COLORS.success} />
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      )}

      
      <TouchableOpacity
        style={[styles.addButton, isLoading && styles.addButtonDisabled]}
        onPress={handleAddItem}
        disabled={isLoading || !itemName.trim()}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.white} size="small" />
        ) : (
          <>
            <FontAwesome6 name="plus" size={16} color={COLORS.white} />
            <Text style={styles.addButtonText}>Add to List</Text>
          </>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default PlannerFormCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    padding: 20,
    gap: 20,
    marginBottom: 100
  },
  inputSection: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  textInput: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.darkCard,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.text,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.darkCard,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityInput: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.darkCard,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
    textAlign: "center",
  },
  categoryScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20, 
  },
  categoryContent: {
    gap: 8,
    paddingRight:35
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.darkCard,
    paddingHorizontal: 12,
    paddingVertical: 8,
   
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  priorityContainer: {
    flexDirection: "row",
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  priorityLow: {
    borderColor: COLORS.info,
    backgroundColor: COLORS.darkCard,
  },
  priorityMedium: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.darkCard,
  },
  priorityHigh: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.darkCard,
  },
  priorityButtonActive: {
    borderWidth: 2,
  },
  priorityText: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.textMuted,
  },
  priorityTextActive: {
    color: COLORS.text,
  },
  errorMessage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
    backgroundColor: `${COLORS.error}15`,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorText: {
    flex: 1,
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.error,
  },
  successMessage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
    backgroundColor: `${COLORS.success}15`,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  successText: {
    flex: 1,
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.success,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
  },
  addButtonDisabled: {
    opacity: 0.6,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
  },
});