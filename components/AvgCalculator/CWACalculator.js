"use client"

import { useState, useRef } from "react"
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
  Animated,
} from "react-native"
import {
  ArrowLeft,
  Calculator,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  Zap,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  GraduationCap,
  BarChart3,
  Brain,
  Star,
  Trophy,
} from "lucide-react-native"

const { width, height } = Dimensions.get("window")

// Decorative Circle Component
const DecorativeCircle = ({ style }) => <View style={[styles.decorativeCircle, style]} />

// Animated Input Component
const AnimatedInput = ({ label, value, onChangeText, placeholder, icon: Icon, keyboardType = "default" }) => {
  const [isFocused, setIsFocused] = useState(false)
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current

  const handleFocus = () => {
    setIsFocused(true)
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (!value) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }
  }

  const labelStyle = {
    position: "absolute",
    left: 50,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["#9CA3AF", "#088a6a"],
    }),
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 4,
    zIndex: 1,
  }

  return (
    <View style={styles.inputContainer}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
        <View style={styles.inputIcon}>
          <Icon color={isFocused ? "#088a6a" : "#9CA3AF"} size={20} />
        </View>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    </View>
  )
}

// Result Card Component
const ResultCard = ({ calculatedCWA, isCalculated }) => {
  const getResultColor = () => {
    if (!isCalculated) return "#6B7280"
    if (calculatedCWA >= 90) return "#10B981"
    if (calculatedCWA >= 80) return "#088a6a"
    if (calculatedCWA >= 70) return "#F59E0B"
    if (calculatedCWA >= 60) return "#F97316"
    return "#EF4444"
  }

  const getResultMessage = () => {
    if (!isCalculated) return "Enter your details to calculate"
    if (calculatedCWA >= 90) return "Excellent! You're aiming high! 🌟"
    if (calculatedCWA >= 80) return "Great target! Keep pushing! 💪"
    if (calculatedCWA >= 70) return "Good goal! You can do it! 📚"
    if (calculatedCWA >= 60) return "Achievable target! Stay focused! 🎯"
    if (calculatedCWA >= 0) return "Challenging but possible! 🚀"
    return "This target might need adjustment 🤔"
  }

  const getResultIcon = () => {
    if (!isCalculated) return Calculator
    if (calculatedCWA >= 90) return Trophy
    if (calculatedCWA >= 80) return Award
    if (calculatedCWA >= 70) return Star
    if (calculatedCWA >= 60) return Target
    if (calculatedCWA >= 0) return TrendingUp
    return AlertCircle
  }

  const ResultIcon = getResultIcon()

  return (
    <View style={[styles.resultCard, { borderColor: getResultColor() + "40" }]}>
      <View style={styles.resultHeader}>
        <View style={[styles.resultIconContainer, { backgroundColor: getResultColor() + "20" }]}>
          <ResultIcon color={getResultColor()} size={28} />
        </View>
        <View style={styles.resultTextContainer}>
          <Text style={styles.resultLabel}>Required Average Score</Text>
          <Text style={[styles.resultValue, { color: getResultColor() }]}>
            {isCalculated ? `${calculatedCWA.toFixed(2)}%` : "--"}
          </Text>
        </View>
      </View>
      <View style={styles.resultMessage}>
        <Text style={[styles.resultMessageText, { color: getResultColor() }]}>{getResultMessage()}</Text>
      </View>
    </View>
  )
}

// Tips Card Component
const TipsCard = () => (
  <View style={styles.tipsCard}>
    <View style={styles.tipsHeader}>
      <Brain color="#088a6a" size={20} />
      <Text style={styles.tipsTitle}>Study Tips 💡</Text>
    </View>
    <View style={styles.tipsList}>
      <Text style={styles.tipItem}>• Set realistic and achievable CWA targets</Text>
      <Text style={styles.tipItem}>• Break down your goals into smaller milestones</Text>
      <Text style={styles.tipItem}>• Focus on understanding rather than memorizing</Text>
      <Text style={styles.tipItem}>• Use active recall and spaced repetition</Text>
    </View>
  </View>
)

const CWACalculator = ({ navigation }) => {
  const [currentCWA, setCurrentCWA] = useState("")
  const [targetedCWA, setTargetedCWA] = useState("")
  const [newCreditHours, setNewCreditHours] = useState("")
  const [completedCreditHours, setCompletedCreditHours] = useState("")
  const [calculatedCWA, setCalculatedCWA] = useState(0)
  const [isCalculated, setIsCalculated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Generate random circles for decoration
  const decorativeCircles = [
    { size: 150, top: 80, right: -60, opacity: 0.04, color: "#088a6a" },
    { size: 120, top: height * 0.6, left: -40, opacity: 0.03, color: "#F59E0B" },
    { size: 100, bottom: 150, right: -30, opacity: 0.05, color: "#06B6D4" },
    { size: 80, top: height * 0.4, left: 20, opacity: 0.03, color: "#8B5CF6" },
    { size: 90, bottom: 200, left: -25, opacity: 0.04, color: "#EF4444" },
  ]

  const validateInputs = () => {
    const currentCWAValue = Number.parseFloat(currentCWA)
    const targetedCWAValue = Number.parseFloat(targetedCWA)
    const newCreditHoursValue = Number.parseFloat(newCreditHours)
    const completedCreditHoursValue = Number.parseFloat(completedCreditHours)

    if (!currentCWA || !targetedCWA || !newCreditHours || !completedCreditHours) {
      Alert.alert("Missing Information", "Please fill in all fields to calculate your required average score.", [
        { text: "Got it!" },
      ])
      return false
    }

    if (
      isNaN(currentCWAValue) ||
      isNaN(targetedCWAValue) ||
      isNaN(newCreditHoursValue) ||
      isNaN(completedCreditHoursValue)
    ) {
      Alert.alert("Invalid Input", "Please enter valid numbers for all fields.", [{ text: "Try again" }])
      return false
    }

    if (currentCWAValue < 0 || currentCWAValue > 100) {
      Alert.alert("Invalid CWA", "Current CWA should be between 0 and 100.", [{ text: "Fix it" }])
      return false
    }

    if (targetedCWAValue < 0 || targetedCWAValue > 100) {
      Alert.alert("Invalid Target", "Targeted CWA should be between 0 and 100.", [{ text: "Fix it" }])
      return false
    }

    if (newCreditHoursValue <= 0 || completedCreditHoursValue <= 0) {
      Alert.alert("Invalid Credit Hours", "Credit hours should be greater than 0.", [{ text: "Fix it" }])
      return false
    }

    return true
  }

  const handleCalculate = async () => {
    if (!validateInputs()) return

    setIsLoading(true)

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const currentCWAValue = Number.parseFloat(currentCWA)
      const targetedCWAValue = Number.parseFloat(targetedCWA)
      const newCreditHoursValue = Number.parseFloat(newCreditHours)
      const completedCreditHoursValue = Number.parseFloat(completedCreditHours)

      const totalCreditHours = newCreditHoursValue + completedCreditHoursValue
      const result =
        (targetedCWAValue * totalCreditHours - currentCWAValue * completedCreditHoursValue) / newCreditHoursValue

      setCalculatedCWA(result)
      setIsCalculated(true)
      setIsLoading(false)

      // Show success message
      if (result >= 0 && result <= 100) {
        Alert.alert(
          "🎯 Calculation Complete!",
          `You need an average of ${result.toFixed(2)}% in your upcoming courses to reach your target CWA.`,
          [{ text: "Great!" }],
        )
      } else if (result > 100) {
        Alert.alert(
          "🚀 Ambitious Target!",
          `Your target requires ${result.toFixed(
            2,
          )}% average, which is above 100%. Consider adjusting your target or taking more credit hours.`,
          [{ text: "I'll adjust" }],
        )
      } else {
        Alert.alert(
          "⚠️ Target Analysis",
          "Your current performance already exceeds your target! You can aim higher or maintain your current pace.",
          [{ text: "Awesome!" }],
        )
      }
    }, 1000)
  }

  const clearAll = () => {
    setCurrentCWA("")
    setTargetedCWA("")
    setNewCreditHours("")
    setCompletedCreditHours("")
    setCalculatedCWA(0)
    setIsCalculated(false)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Decorative Circles */}
      {decorativeCircles.map((circle, index) => (
        <DecorativeCircle
          key={index}
          style={{
            width: circle.size,
            height: circle.size,
            borderRadius: circle.size / 2,
            backgroundColor: circle.color,
            opacity: circle.opacity,
            position: "absolute",
            top: circle.top,
            left: circle.left,
            right: circle.right,
            bottom: circle.bottom,
            zIndex: 1,
          }}
        />
      ))}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>CWA Calculator</Text>
          <Text style={styles.headerSubtitle}>Plan your academic success</Text>
        </View>
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeHeader}>
            <GraduationCap color="#088a6a" size={32} />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>Calculate Your Target Score! 🎯</Text>
              <Text style={styles.welcomeSubtitle}>
                Enter your current academic details to find out what average score you need in upcoming courses to reach
                your target CWA.
              </Text>
            </View>
          </View>
        </View>

        {/* Result Card */}
        <ResultCard calculatedCWA={calculatedCWA} isCalculated={isCalculated} />

        {/* Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.sectionHeader}>
            <BarChart3 color="#088a6a" size={20} />
            <Text style={styles.sectionTitle}>Academic Information</Text>
          </View>

          <AnimatedInput
            label="Current CWA"
            value={currentCWA}
            onChangeText={setCurrentCWA}
            placeholder="e.g., 3.5 or 85"
            icon={BookOpen}
            keyboardType="numeric"
          />

          <AnimatedInput
            label="Target CWA"
            value={targetedCWA}
            onChangeText={setTargetedCWA}
            placeholder="e.g., 3.8 or 90"
            icon={Target}
            keyboardType="numeric"
          />

          <AnimatedInput
            label="Current Semester Credit Hours"
            value={newCreditHours}
            onChangeText={setNewCreditHours}
            placeholder="e.g., 18"
            icon={Sparkles}
            keyboardType="numeric"
          />

          <AnimatedInput
            label="Completed Credit Hours"
            value={completedCreditHours}
            onChangeText={setCompletedCreditHours}
            placeholder="e.g., 60"
            icon={CheckCircle2}
            keyboardType="numeric"
          />
        </View>

        {/* Tips Card */}
        <TipsCard />

        {/* Extra space at bottom for button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Calculate Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.calculateButton, isLoading && styles.calculateButtonLoading]}
          onPress={handleCalculate}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <View style={styles.calculateButtonContent}>
            {isLoading ? (
              <>
                <View style={styles.loadingSpinner} />
                <Text style={styles.calculateButtonText}>Calculating...</Text>
              </>
            ) : (
              <>
                <Calculator color="#FFFFFF" size={20} />
                <Text style={styles.calculateButtonText}>Calculate Required Score</Text>
                <Zap color="#FFFFFF" size={20} />
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // Decorative Circle
  decorativeCircle: {
    position: "absolute",
    zIndex: 1,
  },

  // Header Styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 20,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },

  // Scroll View
  scrollView: {
    flex: 1,
    zIndex: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  // Welcome Card
  welcomeCard: {
    marginBottom: 20,
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    zIndex: 10,
  },
  welcomeHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },

  // Result Card
  resultCard: {
    marginBottom: 20,
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    zIndex: 10,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  resultIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  resultTextContainer: {
    flex: 1,
  },
  resultLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: "700",
  },
  resultMessage: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 12,
  },
  resultMessageText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  // Input Section
  inputSection: {
    marginBottom: 20,
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    zIndex: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  // Animated Input Styles
  inputContainer: {
    marginBottom: 20,
    position: "relative",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputWrapperFocused: {
    borderColor: "#088a6a",
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },

  // Tips Card
  tipsCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 10,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },

  // Bottom Container
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    zIndex: 20,
  },
  calculateButton: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#088a6a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  calculateButtonLoading: {
    backgroundColor: "#9CA3AF",
  },
  calculateButtonContent: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  loadingSpinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderTopColor: "transparent",
    // Note: In a real app, you'd use a proper loading animation library
  },
})

export default CWACalculator