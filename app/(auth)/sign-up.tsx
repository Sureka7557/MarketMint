import { Ionicons } from "@expo/vector-icons";
import { useSignUp } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";
import BackgroundDecor from "@/components/BackgroundDecor";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const logoFade = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(14)).current;
  const cardFade = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(24)).current;
  const footerFade = useRef(new Animated.Value(0)).current;


  const buttonScale = useRef(new Animated.Value(1)).current;

  const cardShake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    logoFade.setValue(0);
    logoScale.setValue(0.85);
    headerFade.setValue(0);
    headerSlide.setValue(14);
    cardFade.setValue(0);
    cardSlide.setValue(24);
    footerFade.setValue(0);

    Animated.parallel([
      Animated.timing(logoFade, {
        toValue: 1,
        duration: 550,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 550,
        useNativeDriver: true,
      }),
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 550,
        delay: 150,
        useNativeDriver: true,
      }),
      Animated.timing(headerSlide, {
        toValue: 0,
        duration: 550,
        delay: 150,
        useNativeDriver: true,
      }),
      Animated.timing(cardFade, {
        toValue: 1,
        duration: 550,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(cardSlide, {
        toValue: 0,
        duration: 550,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(footerFade, {
        toValue: 1,
        duration: 500,
        delay: 550,
        useNativeDriver: true,
      }),
    ]).start();
  }, [pendingVerification]);

  useEffect(() => {
    if (!error) return;
    Animated.sequence([
      Animated.timing(cardShake, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(cardShake, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(cardShake, { toValue: -6, duration: 50, useNativeDriver: true }),
      Animated.timing(cardShake, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(cardShake, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }, [error]);

  const onPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return COLORS.error;
    if (passwordStrength <= 2) return COLORS.warning;
    if (passwordStrength <= 3) return COLORS.gold;
    if (passwordStrength <= 4) return COLORS.primary;
    return COLORS.primaryLight;
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return "No strength";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Fair";
    if (passwordStrength <= 4) return "Good";
    return "Strong";
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setError("");

    if (!emailAddress || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err?.errors?.[0]?.message ?? "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setError("");

    if (!code) {
      setError("Enter the verification code from your email.");
      return;
    }

    setLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.log(JSON.stringify(signUpAttempt, null, 2));
        setError("Verification incomplete. Please try again.");
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message ?? "Invalid code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={COLORS.gradientPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.safeArea}
    >
      <BackgroundDecor />

      <SafeAreaView style={styles.safeAreaInner}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {!pendingVerification ? (
              <>
                <View style={styles.headerWrap}>
                  <Animated.View
                    style={{
                      opacity: logoFade,
                      transform: [{ scale: logoScale }],
                    }}
                  >
                    <View style={styles.logoContainer}>
                      <Image
                        source={require("@/assets/images/logo.png")}
                        style={styles.logo}
                        resizeMode="cover"
                      />
                    </View>
                  </Animated.View>

                  <Animated.View
                    style={{
                      opacity: headerFade,
                      transform: [{ translateY: headerSlide }],
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.title}>Create account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
                  </Animated.View>
                </View>

                <Animated.View
                  style={[
                    styles.card,
                    {
                      opacity: cardFade,
                      transform: [
                        { translateY: cardSlide },
                        { translateX: cardShake },
                      ],
                    },
                  ]}
                >
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="you@example.com"
                    placeholderTextColor={COLORS.textMuted}
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                    style={styles.input}
                  />

                  <Text style={styles.label}>Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      value={password}
                      placeholder="••••••••"
                      placeholderTextColor={COLORS.textMuted}
                      secureTextEntry={!showPassword}
                      onChangeText={setPassword}
                      style={styles.passwordInput}
                    />
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      hitSlop={10}
                      style={styles.eyeButton}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color={COLORS.textMuted}
                      />
                    </Pressable>
                  </View>

                  {password.length > 0 && (
                    <View style={styles.strengthContainer}>
                      <View style={styles.strengthBarsContainer}>
                        {[...Array(5)].map((_, i) => (
                          <View
                            key={i}
                            style={[
                              styles.strengthBar,
                              {
                                backgroundColor:
                                  i < passwordStrength ? getStrengthColor() : COLORS.border,
                              },
                            ]}
                          />
                        ))}
                      </View>
                      <Text style={[styles.strengthText, { color: getStrengthColor() }]}>
                        {getStrengthText()}
                      </Text>
                    </View>
                  )}

                  <Text style={styles.label}>Confirm Password</Text>
                  <View
                    style={[
                      styles.passwordContainer,
                      password &&
                        confirmPassword &&
                        password !== confirmPassword &&
                        styles.passwordContainerError,
                    ]}
                  >
                    <TextInput
                      value={confirmPassword}
                      placeholder="••••••••"
                      placeholderTextColor={COLORS.textMuted}
                      secureTextEntry={!showConfirmPassword}
                      onChangeText={setConfirmPassword}
                      style={styles.passwordInput}
                    />
                    <Pressable
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      hitSlop={10}
                      style={styles.eyeButton}
                    >
                      <Ionicons
                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color={COLORS.textMuted}
                      />
                    </Pressable>
                  </View>

                  {/* Password Match Indicator */}
                  {confirmPassword.length > 0 && (
                    <View style={styles.matchIndicator}>
                      <Ionicons
                        name={password === confirmPassword ? "checkmark-circle" : "close-circle"}
                        size={16}
                        color={password === confirmPassword ? COLORS.success : COLORS.error}
                      />
                      <Text
                        style={[
                          styles.matchText,
                          {
                            color: password === confirmPassword ? COLORS.success : COLORS.error,
                          },
                        ]}
                      >
                        {password === confirmPassword ? "Passwords match" : "Passwords don't match"}
                      </Text>
                    </View>
                  )}

                  {!!error && <Text style={styles.errorText}>{error}</Text>}

                  <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                    <Pressable
                      onPress={onSignUpPress}
                      onPressIn={onPressIn}
                      onPressOut={onPressOut}
                      disabled={loading}
                      style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                    >
                      {loading ? (
                        <ActivityIndicator color={COLORS.buttonText} />
                      ) : (
                        <Text style={styles.primaryButtonText}>Create Account</Text>
                      )}
                    </Pressable>
                  </Animated.View>
                </Animated.View>

                <Animated.View style={[styles.footerRow, { opacity: footerFade }]}>
                  <Text style={styles.footerText}>Already have an account?</Text>
                  <Link href="/sign-in" asChild>
                    <Pressable>
                      <Text style={styles.footerLink}> Sign in</Text>
                    </Pressable>
                  </Link>
                </Animated.View>
              </>
            ) : (
              <>
                <View style={styles.headerWrap}>
                  <Animated.View
                    style={{
                      opacity: logoFade,
                      transform: [{ scale: logoScale }],
                    }}
                  >
                    <View style={[styles.logoContainer, styles.verifyIconContainer]}>
                      <Ionicons name="mail-open-outline" size={32} color={COLORS.primaryLight} />
                    </View>
                  </Animated.View>

                  <Animated.View
                    style={{
                      opacity: headerFade,
                      transform: [{ translateY: headerSlide }],
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.title}>Check your email</Text>
                    <Text style={styles.subtitle}>
                      Enter the code we sent to {emailAddress}
                    </Text>
                  </Animated.View>
                </View>

                <Animated.View
                  style={[
                    styles.card,
                    {
                      opacity: cardFade,
                      transform: [
                        { translateY: cardSlide },
                        { translateX: cardShake },
                      ],
                    },
                  ]}
                >
                  <Text style={styles.label}>Verification code</Text>
                  <TextInput
                    value={code}
                    placeholder="123456"
                    placeholderTextColor={COLORS.textMuted}
                    keyboardType="number-pad"
                    maxLength={6}
                    onChangeText={setCode}
                    style={styles.input}
                  />

                  {!!error && <Text style={styles.errorText}>{error}</Text>}

                  <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                    <Pressable
                      onPress={onVerifyPress}
                      onPressIn={onPressIn}
                      onPressOut={onPressOut}
                      disabled={loading}
                      style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                    >
                      {loading ? (
                        <ActivityIndicator color={COLORS.buttonText} />
                      ) : (
                        <Text style={styles.primaryButtonText}>Verify</Text>
                      )}
                    </Pressable>
                  </Animated.View>
                </Animated.View>
              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  safeAreaInner: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerWrap: {
    alignItems: "center",
    marginBottom: 26,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  verifyIconContainer: {
    backgroundColor: COLORS.overlayLight,
    borderColor: COLORS.primary,
  },
  logo: {
    width: 100,
    height: 130,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.extraBold,
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.white,
    marginTop: 2,
    textAlign: "center",
    fontFamily: FONTS.regular,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 14,
  },
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    fontFamily: FONTS.medium,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    paddingHorizontal: 14,
  },
  passwordContainerError: {
    borderColor: COLORS.error,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: COLORS.text,
    fontFamily: FONTS.medium,
  },
  eyeButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  strengthContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  strengthBarsContainer: {
    flexDirection: "row",
    gap: 3,
    flex: 1,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    minWidth: 50,
    textAlign: "right",
  },
  matchIndicator: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  matchText: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    marginTop: 12,
    paddingHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 11,
    alignItems: "center",
    marginTop: 22,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  primaryButtonText: {
    color: COLORS.buttonText,
    fontSize: 16,
    fontFamily: FONTS.extraBold,
    letterSpacing: 0.5,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
  },
  footerText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  footerLink: {
    color: COLORS.darkOverlay,
    fontSize: 14,
    fontFamily: FONTS.extraBold,
  },
});

