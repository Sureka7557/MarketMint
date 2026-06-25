import { FontAwesome6 } from "@expo/vector-icons";
import * as Sentry from "@sentry/react-native"
import { Pressable, Text, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 16,
    zIndex: 50,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
  },
});

const SentryFeedbackButton = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          bottom: insets.bottom + 90,
        },
      ]}
    >
      <Pressable
        onPress={() => Sentry.showFeedbackWidget()}
        style={styles.button}
      >
        <FontAwesome6 name="comment-dots" size={14} color={COLORS.primary} />
        <Text style={styles.buttonText}>Feedback</Text>
      </Pressable>
    </View>
  );
};

export default SentryFeedbackButton;