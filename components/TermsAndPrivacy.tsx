import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";
import Checkbox from "expo-checkbox";

type TermsAndPrivacyProps = {
  /** Whether the user has already agreed (controlled by parent screen). */
  agreed: boolean;
  /** Called when the user taps "I Agree" with the checkbox ticked. */
  onAgree: () => void;
};

export default function TermsAndPrivacy({ agreed, onAgree }: TermsAndPrivacyProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setChecked] = useState(agreed);

  const openModal = () => {
    setChecked(agreed); // reflect prior agreement if reopened
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setChecked(agreed);
  };

  const handleAgree = () => {
    if (!isChecked) return;
    onAgree();
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.termsSection}>
        <Text style={styles.termsText}>
          {agreed && (
            <Text style={styles.agreedBadge}>
              <Ionicons name="checkmark-circle" size={13} color={COLORS.primary} />
              {"  Agreed  ·  "}
            </Text>
          )}
          By continuing, you agree to our{" "}
          <Text style={styles.termsLink} onPress={openModal}>
            Terms and Privacy Policy.
          </Text>
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Terms & Privacy Policy</Text>
              <Pressable
                onPress={closeModal}
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Ionicons name="close" size={24} color={COLORS.text} />
              </Pressable>
            </View>

            {/* Scrollable Content */}
            <ScrollView
              style={styles.modalScroll}
              showsVerticalScrollIndicator={true}
            >
              <View style={styles.modalBody}>
                <Text style={styles.sectionTitle}>Terms of Service</Text>
                <Text style={styles.bodyText}>
                  By using Grocify, you agree to comply with these terms and
                  conditions. Our service is provided as-is, and we reserve the
                  right to modify these terms at any time. Continued use of the
                  service constitutes acceptance of any changes.
                </Text>

                <Text style={styles.sectionTitle}>Privacy Policy</Text>
                <Text style={styles.bodyText}>
                  We collect personal information to provide and improve our
                  services. This includes your email address, profile
                  information, and usage data. We do not share your personal
                  information with third parties without your consent, except as
                  required by law.
                </Text>

                <Text style={styles.sectionTitle}>Data Security</Text>
                <Text style={styles.bodyText}>
                  We implement industry-standard security measures to protect
                  your data. However, no method of transmission over the Internet
                  is 100% secure, and we cannot guarantee absolute security.
                </Text>

                <Text style={styles.sectionTitle}>User Responsibilities</Text>
                <Text style={styles.bodyText}>
                  You are responsible for maintaining the confidentiality of
                  your account information and password. You agree not to use
                  the service for any illegal or unauthorized purposes.
                </Text>

                <Text style={styles.sectionTitle}>Contact Us</Text>
                <Text style={styles.bodyText}>
                  If you have any questions about our terms or privacy policy,
                  please contact us at support@grocify.com.
                </Text>
              </View>
            </ScrollView>

            {/* Agreement Checkbox */}
            <View style={styles.agreementSection}>
              <Pressable
                style={styles.checkboxContainer}
                onPress={() => setChecked(!isChecked)}
              >
                <Checkbox
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? COLORS.primary : undefined}
                  style={styles.checkbox}
                />
                <Text style={styles.agreementText}>
                  I agree to the Terms & Privacy Policy
                </Text>
              </Pressable>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <Pressable
                  onPress={closeModal}
                  style={({ pressed }) => [
                    styles.cancelButton,
                    pressed && { opacity: 0.8 },
                  ]}
                >
                  <Text style={styles.cancelButtonText}>Decline</Text>
                </Pressable>

                <Pressable
                  onPress={handleAgree}
                  disabled={!isChecked}
                  style={({ pressed }) => [
                    styles.acceptButton,
                    !isChecked && styles.acceptButtonDisabled,
                    pressed && isChecked && { opacity: 0.85 },
                  ]}
                >
                  <Text
                    style={[
                      styles.acceptButtonText,
                      !isChecked && styles.acceptButtonTextDisabled,
                    ]}
                  >
                    I Agree
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  termsSection: {
    alignItems: "center",
    paddingHorizontal: 8,
  },
  termsText: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 18,
    fontFamily: FONTS.medium,
  },
  agreedBadge: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: 12,
  },
  termsLink: {
    color: COLORS.primaryLight,
    fontFamily: FONTS.bold,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1.5,
    borderColor: COLORS.border,
    height: "90%",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: FONTS.extraBold,
    color: COLORS.text,
  },
  closeButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: COLORS.card,
  },
  modalScroll: {
    flex: 1,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.primaryLight,
    marginTop: 16,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 20,
    marginBottom: 8,
    fontFamily: FONTS.regular,
  },
  agreementSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  checkbox: {
    borderRadius: 6,
    borderColor: COLORS.border,
  },
  agreementText: {
    fontSize: 13,
    color: COLORS.text,
    fontFamily: FONTS.semiBold,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.text,
  },
  acceptButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  acceptButtonDisabled: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
  },
  acceptButtonText: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.buttonText,
  },
  acceptButtonTextDisabled: {
    color: COLORS.textMuted,
  },
});