"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
  Alert,
} from "react-native"
import {
  ArrowLeft,
  Calculator,
  Target,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  GraduationCap,
  Brain,
  Star,
  Clock,
  Zap,
  Crown,
  Flame,
  Diamond,
  Heart,
} from "lucide-react-native"

const { width, height } = Dimensions.get("window")

// Floating Orb Component - REMOVED
// Glassmorphism Card Component - REMOVED
// Neon Input Component - REMOVED
// Holographic Result Display - REMOVED
// Cyberpunk Progress Ring - REMOVED
// Futuristic Scale Display - REMOVED
// Quantum Button Component - REMOVED

// Standard Input Component
const Input = ({ label, value, onChangeText, placeholder, icon: Icon, keyboardType = "default" }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrapper, isFocused && styles.inputFocused]}>
        <View style={styles.iconContainer}>
          <Icon color="#6B7280" size={22} />
        </View>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  )
}

// Standard Result Display
const ResultDisplay = ({ calculatedCGPA, isCalculated }) => {
  const getResultData = () => {
    if (!isCalculated) return { color: "#6B7280", icon: Calculator, grade: "---", message: "Ready to calculate" }
    if (calculatedCGPA >= 3.7) return { color: "#22C55E", icon: Crown, grade: "First Class", message: "Legendary!" }
    if (calculatedCGPA >= 3.3) return { color: "#38BDF8", icon: Diamond, grade: "Upper Second", message: "Brilliant!" }
    if (calculatedCGPA >= 3.0) return { color: "#8B5CF6", icon: Star, grade: "Lower Second", message: "Excellent!" }
    if (calculatedCGPA >= 2.5) return { color: "#F59E0B", icon: Flame, grade: "Third Class", message: "Good work!" }
    if (calculatedCGPA >= 2.0) return { color: "#EF4444", icon: Heart, grade: "Pass", message: "Keep going!" }
    return { color: "#DC2626", icon: AlertCircle, grade: "Below Pass", message: "Need focus!" }
  }

  const { color, icon: ResultIcon, grade, message } = getResultData()

  return (
    <View style={styles.resultContainer}>
      <View style={[styles.resultIcon, { backgroundColor: color + "15" }]}>
        <ResultIcon color={color} size={40} />
      </View>
      <Text style={styles.resultLabel}>Required CGPA</Text>
      <Text style={[styles.resultValue, { color }]}>{isCalculated ? calculatedCGPA.toFixed(2) : "--"}</Text>
      <Text style={styles.resultGrade}>{grade}</Text>
      <Text style={styles.resultMessage}>{message}</Text>
    </View>
  )
}

// Standard Button Component
const Button = ({ onPress, isLoading, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} disabled={isLoading} activeOpacity={0.8}>
    {isLoading ? <View style={styles.spinner} /> : children}
  </TouchableOpacity>
)

const CGPACalculator = ({ navigation }) => {
  const [currentCGPA, setCurrentCGPA] = useState("")
  const [targetedCGPA, setTargetedCGPA] = useState("")
  const [newCreditHours, setNewCreditHours] = useState("")
  const [completedCreditHours, setCompletedCreditHours] = useState("")
  const [calculatedCGPA, setCalculatedCGPA] = useState(0)
  const [isCalculated, setIsCalculated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Background animation - REMOVED
  // const backgroundValue = useRef(new Animated.Value(0)).current

  // useEffect(() => {
  //   const backgroundAnimation = Animated.loop(
  //     Animated.timing(backgroundValue, {
  //       toValue: 1,
  //       duration: 10000,
  //       useNativeDriver: true,
  //     }),
  //   )
  //   backgroundAnimation.start()
  //   return () => backgroundAnimation.stop()
  // }, [])

  const validateInputs = () => {
    const currentCGPAValue = Number.parseFloat(currentCGPA)
    const targetedCGPAValue = Number.parseFloat(targetedCGPA)
    const newCreditHoursValue = Number.parseFloat(newCreditHours)
    const completedCreditHoursValue = Number.parseFloat(completedCreditHours)

    if (!currentCGPA || !targetedCGPA || !newCreditHours || !completedCreditHours) {
      Alert.alert("Missing Data", "Please fill in all fields to calculate your CGPA!", [{ text: "OK" }])
      return false
    }

    if (
      isNaN(currentCGPAValue) ||
      isNaN(targetedCGPAValue) ||
      isNaN(newCreditHoursValue) ||
      isNaN(completedCreditHoursValue)
    ) {
      Alert.alert("Invalid Input", "Please enter valid numerical values in all fields.", [{ text: "OK" }])
      return false
    }

    if (currentCGPAValue < 0 || currentCGPAValue > 4.0) {
      Alert.alert("CGPA Range Error", "Current CGPA should be between 0.00 and 4.00.", [{ text: "OK" }])
      return false
    }

    if (targetedCGPAValue < 0 || targetedCGPAValue > 4.0) {
      Alert.alert("Target Range Error", "Target CGPA should be between 0.00 and 4.00.", [{ text: "OK" }])
      return false
    }

    if (newCreditHoursValue <= 0 || completedCreditHoursValue < 0) {
      Alert.alert("Credit Hours Error", "Credit hours should be valid positive numbers.", [{ text: "OK" }])
      return false
    }

    return true
  }

  const handleCalculate = async () => {
    if (!validateInputs()) return

    setIsLoading(true)

    setTimeout(() => {
      const currentCGPAValue = Number.parseFloat(currentCGPA)
      const targetedCGPAValue = Number.parseFloat(targetedCGPA)
      const newCreditHoursValue = Number.parseFloat(newCreditHours)
      const completedCreditHoursValue = Number.parseFloat(completedCreditHours)

      let result

      if (completedCreditHoursValue === 0) {
        result = targetedCGPAValue
      } else {
        const totalCreditHours = newCreditHoursValue + completedCreditHoursValue
        result =
          (targetedCGPAValue * totalCreditHours - currentCGPAValue * completedCreditHoursValue) / newCreditHoursValue
      }

      setCalculatedCGPA(result)
      setIsCalculated(true)
      setIsLoading(false)

      if (result >= 0 && result <= 4.0) {
        Alert.alert("Calculation Complete!", `Your target requires a ${result.toFixed(2)} CGPA in upcoming courses.`, [
          { text: "OK" },
        ])
      } else if (result > 4.0) {
        Alert.alert(
          "Impossible Target!",
          `Your target requires ${result.toFixed(
            2,
          )} CGPA - that's beyond the 4.0 scale! Consider adjusting your trajectory.`,
          [{ text: "OK" }],
        )
      } else {
        Alert.alert("Already Achieved!", "Your current performance already exceeds your target! Time to aim higher!", [
          { text: "OK" },
        ])
      }
    }, 1500)
  }

  const clearAll = () => {
    setCurrentCGPA("")
    setTargetedCGPA("")
    setNewCreditHours("")
    setCompletedCreditHours("")
    setCalculatedCGPA(0)
    setIsCalculated(false)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Animated Background - REMOVED */}
      {/* <Animated.View
        style={[
          styles.animatedBackground,
          {
            transform: [
              {
                rotate: backgroundValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          },
        ]}
      /> */}

      {/* Floating Orbs - REMOVED */}
      {/* <FloatingOrb size={60} color="rgba(0, 245, 255, 0.1)" delay={0} duration={4000} />
      <FloatingOrb size={40} color="rgba(139, 92, 246, 0.1)" delay={1000} duration={3000} />
      <FloatingOrb size={80} color="rgba(255, 215, 0, 0.1)" delay={2000} duration={5000} /> */}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft color="#52525B" size={24} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>CGPA Calculator</Text>
          <Text style={styles.headerSubtitle}>Plan your academic path</Text>
        </View>
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Zap color="#52525B" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <GraduationCap color="#10B981" size={36} />
            <Text style={styles.welcomeTitle}>Welcome!</Text>
            <Text style={styles.welcomeSubtitle}>
              Calculate the required CGPA in upcoming courses to reach your target.
            </Text>
          </View>
        </View>

        {/* Holographic Result - REMOVED */}
        {/* <HolographicResult calculatedCGPA={calculatedCGPA} isCalculated={isCalculated} /> */}
        <ResultDisplay calculatedCGPA={calculatedCGPA} isCalculated={isCalculated} />

        {/* Input Matrix - REMOVED */}
        {/* <GlassCard style={styles.inputMatrix}>
          <View style={styles.matrixHeader}>
            <BarChart3 color="#8B5CF6" size={24} />
            <Text style={styles.matrixTitle}>Data Input Matrix</Text>
          </View>

          <NeonInput
            label="Current CGPA"
            value={currentCGPA}
            onChangeText={setCurrentCGPA}
            placeholder="3.25"
            icon={BookOpen}
            keyboardType="numeric"
          />

          <NeonInput
            label="Target CGPA"
            value={targetedCGPA}
            onChangeText={setTargetedCGPA}
            placeholder="3.50"
            icon={Target}
            keyboardType="numeric"
          />

          <NeonInput
            label="Current Semester Credits"
            value={newCreditHours}
            onChangeText={setNewCreditHours}
            placeholder="18"
            icon={Clock}
            keyboardType="numeric"
          />

          <NeonInput
            label="Completed Credits"
            value={completedCreditHours}
            onChangeText={setCompletedCreditHours}
            placeholder="60"
            icon={CheckCircle2}
            keyboardType="numeric"
          />
        </GlassCard> */}

        <View style={styles.inputCard}>
          <Input
            label="Current CGPA"
            value={currentCGPA}
            onChangeText={setCurrentCGPA}
            placeholder="3.25"
            icon={BookOpen}
            keyboardType="numeric"
          />

          <Input
            label="Target CGPA"
            value={targetedCGPA}
            onChangeText={setTargetedCGPA}
            placeholder="3.50"
            icon={Target}
            keyboardType="numeric"
          />

          <Input
            label="Current Semester Credits"
            value={newCreditHours}
            onChangeText={setNewCreditHours}
            placeholder="18"
            icon={Clock}
            keyboardType="numeric"
          />

          <Input
            label="Completed Credits"
            value={completedCreditHours}
            onChangeText={setCompletedCreditHours}
            placeholder="60"
            icon={CheckCircle2}
            keyboardType="numeric"
          />
        </View>

        {/* Futuristic Scale - REMOVED */}
        {/* <FuturisticScale /> */}

        {/* Quantum Tips - REMOVED */}
        {/* <GlassCard style={styles.quantumTips}>
          <View style={styles.tipsHeader}>
            <Brain color="#FFD700" size={24} />
            <Text style={styles.tipsTitle}>Quantum Study Protocol</Text>
          </View>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>⚡ Maintain consistent quantum energy across all subjects</Text>
            <Text style={styles.tipItem}>🔮 Focus on high-credit courses for maximum matrix impact</Text>
            <Text style={styles.tipItem}>🚀 Balance your academic load for optimal performance</Text>
            <Text style={styles.tipItem}>💎 Seek guidance when the matrix becomes complex</Text>
          </View>
        </GlassCard> */}

        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Brain color="#10B981" size={24} />
            <Text style={styles.tipsTitle}>Tips for Success</Text>
          </View>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Maintain consistent effort across all subjects</Text>
            <Text style={styles.tipItem}>• Focus on high-credit courses for maximum impact</Text>
            <Text style={styles.tipItem}>• Balance your academic load for optimal performance</Text>
            <Text style={styles.tipItem}>• Seek guidance when facing difficulties</Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Quantum Calculate Button - REMOVED */}
      {/* <View style={styles.bottomContainer}>
        <QuantumButton onPress={handleCalculate} isLoading={isLoading}>
          <View style={styles.quantumButtonContent}>
            {isLoading ? (
              <>
                <View style={styles.quantumSpinner} />
                <Text style={styles.quantumButtonText}>Processing Matrix...</Text>
              </>
            ) : (
              <>
                <Calculator color="#000" size={22} />
                <Text style={styles.quantumButtonText}>Calculate Quantum CGPA</Text>
                <Sparkles color="#000" size={22} />
              </>
            )}
          </View>
        </QuantumButton>
      </View> */}

      <View style={styles.bottomContainer}>
        <Button onPress={handleCalculate} isLoading={isLoading}>
          <View style={styles.buttonContent}>
            {isLoading ? (
              <Text style={styles.buttonText}>Calculating...</Text>
            ) : (
              <>
                <Calculator color="#FFFFFF" size={22} />
                <Text style={styles.buttonText}>Calculate CGPA</Text>
                <Sparkles color="#FFFFFF" size={22} />
              </>
            )}
          </View>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // Animated Background - REMOVED
  // animatedBackground: {
  //   position: "absolute",
  //   top: -height,
  //   left: -width,
  //   width: width * 3,
  //   height: height * 3,
  //   backgroundColor: "transparent",
  //   borderWidth: 1,
  //   borderColor: "rgba(0, 245, 255, 0.1)",
  //   borderRadius: width * 1.5,
  // },

  // Floating Orbs - REMOVED
  // floatingOrb: {
  //   position: "absolute",
  //   top: Math.random() * height * 0.8,
  //   left: Math.random() * width * 0.8,
  // },

  // Glass Card - REMOVED
  // glassCard: {
  //   backgroundColor: "rgba(255, 255, 255, 0.05)",
  //   borderRadius: 20,
  //   borderWidth: 1,
  //   borderColor: "rgba(255, 255, 255, 0.1)",
  //   overflow: "hidden",
  // },
  // glassCardBlur: {
  //   shadowColor: "#00F5FF",
  //   shadowOffset: { width: 0, height: 4 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 15,
  //   elevation: 8,
  // },
  // glassCardInner: {
  //   padding: 20,
  // },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#52525B",
    marginTop: 4,
  },
  clearButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },

  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  // Welcome Card
  welcomeCard: {
    backgroundColor: "#ECFDF5",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  welcomeContent: {
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 12,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#52525B",
    textAlign: "center",
    lineHeight: 24,
  },

  // Holographic Result - REMOVED
  // holographicContainer: {
  //   marginBottom: 20,
  //   minHeight: 200,
  // },
  // holographicInner: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   position: "relative",
  // },
  // holographicBg: {
  //   position: "absolute",
  //   width: 150,
  //   height: 150,
  //   borderRadius: 75,
  //   borderWidth: 2,
  //   borderColor: "rgba(0, 245, 255, 0.3)",
  //   borderStyle: "dashed",
  // },
  // holographicContent: {
  //   alignItems: "center",
  //   zIndex: 2,
  // },
  // holographicIcon: {
  //   width: 80,
  //   height: 80,
  //   borderRadius: 40,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginBottom: 16,
  //   borderWidth: 2,
  //   borderColor: "rgba(255, 255, 255, 0.2)",
  // },
  // holographicLabel: {
  //   fontSize: 14,
  //   color: "rgba(255, 255, 255, 0.6)",
  //   marginBottom: 8,
  //   letterSpacing: 1,
  // },
  // holographicValue: {
  //   fontSize: 48,
  //   fontWeight: "900",
  //   marginBottom: 8,
  //   textShadowColor: "currentColor",
  //   textShadowOffset: { width: 0, height: 0 },
  //   textShadowRadius: 20,
  // },
  // holographicGrade: {
  //   fontSize: 16,
  //   fontWeight: "600",
  //   marginBottom: 8,
  //   letterSpacing: 1,
  // },
  // holographicMessage: {
  //   fontSize: 14,
  //   color: "rgba(255, 255, 255, 0.8)",
  //   textAlign: "center",
  // },

  // Neon Input - REMOVED
  // neonInputContainer: {
  //   marginBottom: 24,
  // },
  // neonLabel: {
  //   fontSize: 14,
  //   fontWeight: "600",
  //   marginBottom: 8,
  //   letterSpacing: 1,
  // },
  // neonInputWrapper: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "rgba(255, 255, 255, 0.05)",
  //   borderRadius: 15,
  //   borderWidth: 2,
  //   paddingHorizontal: 16,
  //   paddingVertical: 16,
  //   elevation: 5,
  // },
  // neonIconContainer: {
  //   marginRight: 12,
  //   width: 30,
  //   alignItems: "center",
  // },
  // neonTextInput: {
  //   flex: 1,
  //   fontSize: 16,
  //   color: "#FFFFFF",
  //   fontWeight: "500",
  // },

  // Input Matrix - REMOVED
  // inputMatrix: {
  //   marginBottom: 20,
  // },
  // matrixHeader: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 24,
  //   gap: 12,
  // },
  // matrixTitle: {
  //   fontSize: 20,
  //   fontWeight: "700",
  //   color: "#FFFFFF",
  //   letterSpacing: 1,
  // },

  // Futuristic Scale - REMOVED
  // futuristicScale: {
  //   marginBottom: 20,
  // },
  // scaleHeader: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 20,
  //   gap: 12,
  // },
  // scaleTitle: {
  //   fontSize: 18,
  //   fontWeight: "700",
  //   color: "#FFFFFF",
  //   letterSpacing: 1,
  // },
  // scaleGrid: {
  //   gap: 16,
  // },
  // scaleItem: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "rgba(255, 255, 255, 0.03)",
  //   borderRadius: 12,
  //   padding: 16,
  //   borderWidth: 1,
  //   borderColor: "rgba(255, 255, 255, 0.1)",
  // },
  // scaleIcon: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginRight: 16,
  // },
  // scaleInfo: {
  //   flex: 1,
  // },
  // scaleRange: {
  //   fontSize: 16,
  //   fontWeight: "700",
  //   marginBottom: 4,
  // },
  // scaleGrade: {
  //   fontSize: 14,
  //   color: "rgba(255, 255, 255, 0.7)",
  // },

  // Cyberpunk Ring - REMOVED
  // cyberpunkRing: {
  //   width: 40,
  //   height: 40,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // cyberpunkRingOuter: {
  //   position: "absolute",
  //   width: 36,
  //   height: 36,
  //   borderRadius: 18,
  //   borderWidth: 2,
  // },
  // cyberpunkRingInner: {
  //   width: 24,
  //   height: 24,
  //   borderRadius: 12,
  //   borderWidth: 1,
  // },

  // Quantum Tips - REMOVED
  // quantumTips: {
  //   marginBottom: 20,
  // },
  // tipsHeader: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 16,
  //   gap: 12,
  // },
  // tipsTitle: {
  //   fontSize: 18,
  //   fontWeight: "700",
  //   color: "#FFFFFF",
  //   letterSpacing: 1,
  // },
  // tipsList: {
  //   gap: 12,
  // },
  // tipItem: {
  //   fontSize: 14,
  //   color: "rgba(255, 255, 255, 0.8)",
  //   lineHeight: 20,
  // },

  // Quantum Button - REMOVED
  // bottomContainer: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   padding: 20,
  //   paddingBottom: Platform.OS === "ios" ? 40 : 20,
  //   zIndex: 20,
  // },
  // quantumButton: {
  //   borderRadius: 20,
  //   overflow: "hidden",
  // },
  // quantumButtonInner: {
  //   backgroundColor: "#00F5FF",
  //   paddingVertical: 20,
  //   paddingHorizontal: 24,
  //   shadowColor: "#00F5FF",
  //   shadowOffset: { width: 0, height: 8 },
  //   shadowRadius: 20,
  //   elevation: 10,
  // },
  // quantumButtonContent: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   gap: 12,
  // },
  // quantumButtonText: {
  //   fontSize: 18,
  //   fontWeight: "800",
  //   color: "#000",
  //   letterSpacing: 1,
  // },
  // quantumSpinner: {
  //   width: 22,
  //   height: 22,
  //   borderRadius: 11,
  //   borderWidth: 3,
  //   borderColor: "#000",
  //   borderTopColor: "transparent",
  // },

  // Standard Input
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  inputFocused: {
    borderColor: "#10B981",
  },
  iconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
    paddingVertical: 12,
  },

  // Standard Result Display
  resultContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  resultIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 14,
    color: "#52525B",
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 48,
    fontWeight: "700",
    marginBottom: 8,
  },
  resultGrade: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  resultMessage: {
    fontSize: 14,
    color: "#52525B",
  },

  // Standard Button
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: "#10B981",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  spinner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderTopColor: "transparent",
  },

  // Input Card
  inputCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  // Tips Card
  tipsCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    fontSize: 14,
    color: "#52525B",
    lineHeight: 20,
  },
})

export default CGPACalculator