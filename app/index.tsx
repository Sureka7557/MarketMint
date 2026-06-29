import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState,useRef } from "react";
import GradientTitle from "@/components/GradiantTitle";
import { Animated, Easing } from "react-native";

import {
  ActivityIndicator,
  Image,
  ImageBackground,
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

  // Continuous ambient animation — gentle logo float
  const logoBob = useRef(new Animated.Value(0)).current;

  // Floating vegetable animations
  const vegBob1 = useRef(new Animated.Value(0)).current;
  const vegBob2 = useRef(new Animated.Value(0)).current;
  const vegBob3 = useRef(new Animated.Value(0)).current;
  const vegBob4 = useRef(new Animated.Value(0)).current;
  const vegBob5 = useRef(new Animated.Value(0)).current;
  const vegBob6 = useRef(new Animated.Value(0)).current;

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

  // Ambient loop — gentle floating logo
  useEffect(() => {
    const bobLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(logoBob, {
          toValue: -8,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(logoBob, {
          toValue: 0,
          duration: 1500,
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

  // Vegetable floating animations
  useEffect(() => {
    const veg1Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(vegBob1, {
          toValue: -12,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(vegBob1, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    veg1Loop.start();
    return () => veg1Loop.stop();
  }, []);

  useEffect(() => {
    const veg2Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(vegBob2, {
          toValue: -10,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(vegBob2, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    veg2Loop.start();
    return () => veg2Loop.stop();
  }, []);

  useEffect(() => {
    const veg3Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(vegBob3, {
          toValue: -14,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(vegBob3, {
          toValue: 0,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    veg3Loop.start();
    return () => veg3Loop.stop();
  }, []);

  useEffect(() => {
    const veg4Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(vegBob4, {
          toValue: -11,
          duration: 2100,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(vegBob4, {
          toValue: 0,
          duration: 2100,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    veg4Loop.start();
    return () => veg4Loop.stop();
  }, []);

  useEffect(() => {
    const veg5Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(vegBob5, {
          toValue: -13,
          duration: 2300,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(vegBob5, {
          toValue: 0,
          duration: 2300,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    veg5Loop.start();
    return () => veg5Loop.stop();
  }, []);

  useEffect(() => {
    const veg6Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(vegBob6, {
          toValue: -9,
          duration: 1900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(vegBob6, {
          toValue: 0,
          duration: 1900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    veg6Loop.start();
    return () => veg6Loop.stop();
  }, []);

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
      <ImageBackground
        source={require("@/assets/images/index.png")}
        style={[styles.safeArea, styles.centerAll]}
        resizeMode="cover"
      >
        <ActivityIndicator color={COLORS.primary} size="large" />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("@/assets/images/index.png")}
      style={styles.safeArea}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeAreaInner}>
            <StatusBar barStyle="dark-content" />
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
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

      {/* Girl Model with Floating Vegetables */}
      <View style={styles.girlModelContainer}>


         {/* orange - Top Right */}
        <Animated.View
          style={{
            position: "absolute",
            right: 150,
            top: 0,
            transform: [
              { translateY: vegBob2 },
              { rotate: "5deg" },
            ],
          }}
        >
          <Image
            source={require("@/assets/images/orange.png")}
            style={styles.floatingVegSmall}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Capsicum - Top Left */}
        <Animated.View
          style={{
            position: "absolute",
            left: 15,
            top: 70,
            transform: [
              { translateY: vegBob1 },
              { rotate: "-8deg" },
            ],
          }}
        >
          <Image
            source={require("@/assets/images/capsicum.png")}
            style={styles.floatingVegSmall}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Broccoli - Bottom Left */}
        <Animated.View
          style={{
            position: "absolute",
            left: 15,
            bottom: 140,
            transform: [
              { translateY: vegBob3 },
              { rotate: "6deg" },
            ],
          }}
        >
          <Image
            source={require("@/assets/images/broccoli.png")}
            style={styles.floatingVegSmall}
            resizeMode="contain"
          />
        </Animated.View>

        {/* greenapple - Top Right */}
        <Animated.View
          style={{
            position: "absolute",
            right: 15,
            top: 70,
            transform: [
              { translateY: vegBob2 },
              { rotate: "5deg" },
            ],
          }}
        >
          <Image
            source={require("@/assets/images/greenapple.png")}
            style={styles.floatingVegSmall}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Tomato - Bottom Right */}
        <Animated.View
          style={{
            position: "absolute",
            right: 10,
            bottom: 140,
            transform: [
              { translateY: vegBob4 },
              { rotate: "-7deg" },
            ],
          }}
        >
          <Image
            source={require("@/assets/images/tomato.png")}
            style={styles.floatingVegSmall}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Banana - Left Middle */}
        <Animated.View
          style={{
            position: "absolute",
            left: -10,
            top: "40%",
            transform: [
              { translateY: vegBob5 },
              { rotate: "-12deg" },
            ],
          }}
        >
          <Image
            source={require("@/assets/images/banana.png")}
            style={styles.floatingVegSmall}
            resizeMode="contain"
          />
        </Animated.View>

        {/* yellowCapsicum - Right Middle */}
        <Animated.View
          style={{
            position: "absolute",
            right: -10,
            top: "40%",
            transform: [
              { translateY: vegBob6 },
              { rotate: "10deg" },
            ],
          }}
        >
          <Image
            source={require("@/assets/images/yellowCapsicum.png")}
            style={styles.floatingVegSmall}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Girl in Center */}
        <View>
          <Image
            source={require("@/assets/images/model.png")}
            style={styles.girlModel}
            resizeMode="contain"
                  />
          <LinearGradient
          colors={[
            "transparent",
            "#BED1E9",
            "transparent",
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.girlBottomLine}
        />
        </View>
      </View>

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
    </ImageBackground>
  );
  
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
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
    paddingTop: 18,
    paddingBottom: 28,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: COLORS.boardShadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
    paddingHorizontal: 0,
  },
  welcomeSection: {
    alignItems: "center",
  },
 tagline: {
  fontSize: 14,
  color: COLORS.textSecondary,
  textAlign: "center",
  fontFamily: FONTS.medium,
  letterSpacing: 0.5,
  marginTop: 12
},
titleDivider: {
  width: 80,
  height: 4,
  backgroundColor: COLORS.gold,
  borderRadius: 10,
  alignSelf: "center",
  marginVertical: 8,
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
    color: COLORS.primaryDark,
  },
  lockedHint: {
    color: COLORS.gold,
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    textAlign: "center",
    marginTop: 10,
  },
  floatingVegetablesContainer: {
    
    marginVertical: 20,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",

  },
  floatingVeg: {
    width: 100,
    height: 100,
  },
  girlModelContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 0,
    position: "relative",
    width: "100%",
    height: 550,
  },
  girlBottomLine: {
      width: 180,
      height: 6,
      borderRadius: 999,
      alignSelf: "center",        
      marginTop: -18,

  },
  girlModel: {
    width: 280,
    height: 450,
    borderRadius:50
  },
  floatingVegSmall: {
    width: 80,
    height: 80,
  },
});