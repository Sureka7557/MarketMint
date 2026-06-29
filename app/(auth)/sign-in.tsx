import { Ionicons } from "@expo/vector-icons";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  ImageBackground,
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

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Entrance animation — logo, header text, card, footer stagger in
  const logoFade = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(14)).current;
  const cardFade = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(24)).current;
  const footerFade = useRef(new Animated.Value(0)).current;

  // Button press feedback
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Continuous ambient animation — gentle logo float
  const logoBob = useRef(new Animated.Value(0)).current;

  // Error shake, on the card itself
  const cardShake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
  }, []);

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

  // Ambient loop — gentle floating logo
  useEffect(() => {
    const bobLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(logoBob, {
          toValue: -8,
          duration: 1400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(logoBob, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    bobLoop.start();
    return () => {
      bobLoop.stop();
    };
  }, []);

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

  const onSignInPress = async () => {
    if (!isLoaded) return;
    setError("");

    if (!emailAddress || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
        setError("Additional verification is required.");
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message ?? "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/signpage.png")}
      style={styles.safeArea}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeAreaInner}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.headerWrap}>
              <Animated.View
                style={{
                  opacity: logoFade,
                  transform: [{ scale: logoScale }, { translateY: logoBob }],
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
                <Text style={styles.title}>Welcome back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>
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

              {!!error && <Text style={styles.errorText}>{error}</Text>}

              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <Pressable
                  onPress={onSignInPress}
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}
                  disabled={loading}
                  style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                >
                  {loading ? (
                    <ActivityIndicator color={COLORS.buttonText} />
                  ) : (
                    <Text style={styles.primaryButtonText}>Sign In</Text>
                  )}
                </Pressable>
              </Animated.View>
            </Animated.View>

            <Animated.View
              style={[styles.footerRow, { opacity: footerFade }]}
            >
              <Text style={styles.footerText}>Don&apos;t have an account?</Text>
              <Link href="/sign-up" asChild>
                <Pressable>
                  <Text style={styles.footerLink}> Sign up</Text>
                </Pressable>
              </Link>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    marginBottom: 28,
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
  logo: {
    width: 100,
    height:130,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.extraBold,
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontFamily: FONTS.regular,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: 18,
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
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  footerLink: {
    color: COLORS.secondary,
    fontSize: 14,
    fontFamily: FONTS.extraBold,
  },
});