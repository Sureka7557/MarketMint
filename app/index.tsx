import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState,useRef } from "react";
import GradientTitle from "@/components/GradiantTitle";
import { Animated } from "react-native";

import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/COLORS";
import { FONTS } from "@/constants/FONTS";
import BackgroundDecor from "@/components/BackgroundDecor";
import TermsAndPrivacy from "@/components/TermsAndPrivacy";
import { useGroceryStore } from "@/app/store/grocery-store";

export default function WelcomeScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const {isLoading,items}=useGroceryStore()
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showLockedHint, setShowLockedHint] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const logoFade = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;


  const featureAnims = useRef(
    [0, 1, 2].map(() => new Animated.Value(0))
  ).current;

  const buttonFade = useRef(new Animated.Value(0)).current;
  const buttonSlide = useRef(new Animated.Value(20)).current;

  const buttonScale = useRef(new Animated.Value(1)).current;
  const buttonShake = useRef(new Animated.Value(0)).current;
  const hintFade = useRef(new Animated.Value(0)).current;

  const features = [
    "Fresh, quality produce daily",
    "Fast and reliable delivery",
    "Best prices on all items",
  ];

useEffect(() => {
  Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }),
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }),
    Animated.timing(logoFade, {
      toValue: 1,
      duration: 700,
      delay: 250,
      useNativeDriver: true,
    }),
    Animated.timing(logoScale, {
      toValue: 1,
      duration: 700,
      delay: 250,
      useNativeDriver: true,
    }),
    Animated.sequence([
      Animated.delay(500),
      Animated.stagger(
        130,
        featureAnims.map((anim) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          })
        )
      ),
    ]),
    Animated.timing(buttonFade, {
      toValue: 1,
      duration: 600,
      delay: 850,
      useNativeDriver: true,
    }),
    Animated.timing(buttonSlide, {
      toValue: 0,
      duration: 600,
      delay: 850,
      useNativeDriver: true,
    }),
  ]).start();
}, []);

  useEffect(() => {
    if (agreedToTerms) {
      setShowLockedHint(false);
      hintFade.setValue(0);
    }
  }, [agreedToTerms]);

  const onButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  const onButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/home");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <LinearGradient
        colors={COLORS.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.safeArea, styles.centerAll]}
      >
        <ActivityIndicator color={COLORS.primary} size="large" />
      </LinearGradient>
    );
  }

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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
        
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
                <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <GradientTitle />
        </Animated.View> 

        </View>   
         <View style={styles.titleDivider} />       
            <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <Text style={styles.tagline}>
          Fresh Groceries. Smarter Shopping.
        </Text>
      </Animated.View>
            {/* Logo Section */}
          <View style={styles.logoWrapper}>
            <Animated.View
              style={{
                opacity: logoFade,
                transform: [{ scale: logoScale }],
              }}
            >
              <View style={styles.logoContainer}>
                <Image
                  source={require("@/assets/images/index.png")}
                  style={styles.logo}
                  resizeMode="cover"
                />
              </View>
            </Animated.View>
          </View>

       
          {/* Features */}
          <View style={styles.featuresContainer}>
            {features.map((label, i) => (
              <Animated.View
                key={label}
                style={{
                  opacity: featureAnims[i],
                  transform: [
                    {
                      translateY: featureAnims[i].interpolate({
                        inputRange: [0, 1],
                        outputRange: [18, 0],
                      }),
                    },
                  ],
                }}
              >
                <View style={styles.featureItem}>
                  <View style={styles.featureBullet}>
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color={COLORS.primary}
                    />
                  </View>
                  <Text style={styles.featureItemText}>{label}</Text>
                </View>
              </Animated.View>
            ))}
          </View>

          <View style={styles.spacer} />

          <Animated.View
            style={[
              styles.authButtonsGroup,
              {
                opacity: buttonFade,
                transform: [{ translateY: buttonSlide }],
              },
            ]}
          >
            <Animated.View
              style={{
                transform: [
                  { scale: buttonScale },
                  { translateX: buttonShake },
                ],
              }}
            >
              <Pressable
                onPress={() => {
                  if (agreedToTerms) {
                    router.push("/sign-in");
                    return;
                  }
                  setShowLockedHint(true);
                  Animated.timing(hintFade, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                  }).start();
                  Animated.sequence([
                    Animated.timing(buttonShake, {
                      toValue: -8,
                      duration: 50,
                      useNativeDriver: true,
                    }),
                    Animated.timing(buttonShake, {
                      toValue: 8,
                      duration: 50,
                      useNativeDriver: true,
                    }),
                    Animated.timing(buttonShake, {
                      toValue: -6,
                      duration: 50,
                      useNativeDriver: true,
                    }),
                    Animated.timing(buttonShake, {
                      toValue: 6,
                      duration: 50,
                      useNativeDriver: true,
                    }),
                    Animated.timing(buttonShake, {
                      toValue: 0,
                      duration: 50,
                      useNativeDriver: true,
                    }),
                  ]).start();
                }}
                onPressIn={onButtonPressIn}
                onPressOut={onButtonPressOut}
                style={[
                  styles.authButton,
                  !agreedToTerms && styles.authButtonDisabled,
                ]}
              >
                <View
                  style={[
                    styles.authButtonContent,
                    !agreedToTerms && styles.authButtonContentDisabled,
                  ]}
                >
                  <Text
                    style={[
                      styles.authButtonText,
                      !agreedToTerms && styles.authButtonTextDisabled,
                    ]}
                  >
                    Sign In
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color={agreedToTerms ? COLORS.buttonText : COLORS.textMuted}
                  />
                </View>
              </Pressable>
            </Animated.View>

            {showLockedHint && !agreedToTerms && (
              <Animated.Text style={[styles.lockedHint, { opacity: hintFade }]}>
                Please accept the Terms & Privacy Policy below to continue
              </Animated.Text>
            )}
          </Animated.View>

          <TermsAndPrivacy
            agreed={agreedToTerms}
            onAgree={() => setAgreedToTerms(true)}
          />
        </ScrollView>
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
  centerAll: {
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },
  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
 logoContainer: {
  width: 300,
  height: 250,
  borderRadius: 20,
  overflow: "hidden", // important
  backgroundColor: COLORS.card,
  borderWidth: 1.5,
  borderColor: COLORS.border,
  padding:5
},

logo: {
  width: "100%",
  height: "100%",
},
  welcomeSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 32,
    fontFamily: FONTS.extraBold,
    color: COLORS.text,
    textAlign: "center",
    letterSpacing: 0.5,
  },

 tagline: {
  fontSize: 16,
  color: COLORS.textSecondary,
  textAlign: "center",
  fontFamily: FONTS.medium,
  letterSpacing: 0.5,
  marginTop: 12,
  marginBottom: 12,
},
titleDivider: {
  width: 80,
  height: 4,
  backgroundColor: COLORS.gold,
  borderRadius: 10,
  alignSelf: "center",
  marginVertical: 8,
},
  featuresContainer: {
    marginBottom: 32,
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  featureBullet: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.featureBullet,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  featureItemText: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: FONTS.semiBold,
    flex: 1,
  },
  spacer: {
    flex: 1,
    minHeight: 20,
  },
  authButtonsGroup: {
    marginBottom: 24,
  },
  authButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  authButtonDisabled: {
    opacity: 1,
  },
  authButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 13,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  authButtonContentDisabled: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
  },
  authButtonText: {
    color: COLORS.buttonText,
    fontSize: 16,
    fontFamily: FONTS.bold,
    letterSpacing: 0.6,
  },
  authButtonTextDisabled: {
    color: COLORS.textMuted,
  },
  lockedHint: {
    color: COLORS.gold,
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    textAlign: "center",
    marginTop: 10,
  },
});