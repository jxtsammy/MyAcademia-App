"use client"

import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
  Alert,
} from "react-native"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Settings,
  CheckCircle2,
  Target,
  Brain,
  Zap,
  TrendingUp,
  Users,
  Focus,
  BarChart3,
  Lightbulb,
  Timer,
} from "lucide-react-native"

const { width, height } = Dimensions.get("window")

// Custom Slider Component
const CustomSlider = ({
  minimumValue,
  maximumValue,
  step,
  value,
  onValueChange,
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
  style,
}) => {
  const [sliderWidth, setSliderWidth] = useState(0)

  const handleLayout = (event) => {
    setSliderWidth(event.nativeEvent.layout.width)
  }

  const handlePress = (event) => {
    const { locationX } = event.nativeEvent
    const percentage = locationX / sliderWidth
    const range = maximumValue - minimumValue
    const newValue = minimumValue + percentage * range
    const steppedValue = Math.round(newValue / step) * step
    const clampedValue = Math.max(minimumValue, Math.min(maximumValue, steppedValue))
    onValueChange(clampedValue)
  }

  const thumbPosition = ((value - minimumValue) / (maximumValue - minimumValue)) * 100

  return (
    <View style={[styles.customSliderContainer, style]} onLayout={handleLayout}>
      <TouchableOpacity style={styles.customSliderTrack} onPress={handlePress} activeOpacity={1}>
        <View
          style={[
            styles.customSliderTrackFill,
            {
              width: `${thumbPosition}%`,
              backgroundColor: minimumTrackTintColor,
            },
          ]}
        />
        <View
          style={[
            styles.customSliderTrackEmpty,
            {
              backgroundColor: maximumTrackTintColor,
            },
          ]}
        />
        <View
          style={[
            styles.customSliderThumb,
            {
              left: `${thumbPosition}%`,
              backgroundColor: thumbTintColor,
              marginLeft: -16,
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  )
}

// Progress Step Component
const ProgressStep = ({ step, title, icon: Icon, isActive, isCompleted }) => (
  <View style={styles.progressStep}>
    <View
      style={[
        styles.progressCircle,
        isActive && styles.activeProgressCircle,
        isCompleted && styles.completedProgressCircle,
      ]}
    >
      {isCompleted ? (
        <CheckCircle2 color="#FFFFFF" size={18} />
      ) : (
        <Icon color={isActive ? "#FFFFFF" : "#9CA3AF"} size={18} />
      )}
    </View>
    <Text style={[styles.progressTitle, isActive && styles.activeProgressTitle]}>{title}</Text>
  </View>
)

// Recommendation Card Component
const RecommendationCard = ({
  range,
  title,
  description,
  color,
  icon: Icon,
  isRecommended = false,
  isSelected = false,
}) => (
  <View style={[styles.recommendationCard, { borderColor: color }, isSelected && { backgroundColor: color + "10" }]}>
    <View style={styles.recommendationHeader}>
      <View style={[styles.recommendationIcon, { backgroundColor: color }]}>
        <Icon color="#FFFFFF" size={16} />
      </View>
      <View style={styles.recommendationTextContainer}>
        <Text style={[styles.recommendationRange, { color: color }]}>{range}</Text>
        {isRecommended && (
          <View style={styles.recommendedBadge}>
            <Text style={styles.recommendedText}>Recommended</Text>
          </View>
        )}
      </View>
    </View>
    <Text style={styles.recommendationTitle}>{title}</Text>
    <Text style={styles.recommendationDescription}>{description}</Text>
  </View>
)

// Decorative Circle Component
const DecorativeCircle = ({ style }) => <View style={[styles.decorativeCircle, style]} />

const SetDailyLimitsScreen = ({ navigation, route }) => {
  const [dailyCourseLimit, setDailyCourseLimit] = useState(3)

  // Get courses data from previous screen
  const coursesData = route?.params?.courses || []

  // Generate random circles for decoration
  const decorativeCircles = [
    { size: 200, top: 80, right: -80, opacity: 0.08, color: "#FF6B6B" }, // Red
    { size: 150, top: height * 0.5, left: -60, opacity: 0.06, color: "#4ECDC4" }, // Teal
    { size: 120, bottom: 150, right: -40, opacity: 0.07, color: "#45B7D1" }, // Blue
    { size: 80, top: height * 0.3, left: 20, opacity: 0.05, color: "#96CEB4" }, // Green
    { size: 100, top: height * 0.7, right: 30, opacity: 0.06, color: "#FFEAA7" }, // Yellow
    { size: 90, bottom: 300, left: -30, opacity: 0.05, color: "#DDA0DD" }, // Purple
  ]

  const progressSteps = [
    { title: "Add Courses", icon: BookOpen, isActive: false, isCompleted: true },
    { title: "Set Limits", icon: Timer, isActive: true, isCompleted: false },
    { title: "Preferences", icon: Settings, isActive: false, isCompleted: false },
    { title: "Schedule", icon: Calendar, isActive: false, isCompleted: false },
  ]

  const recommendations = [
    {
      range: "1-2 courses",
      title: "Deep Focus Approach",
      description: "Intensive study sessions with maximum concentration on fewer subjects",
      color: "#F59E0B",
      icon: Focus,
      isRecommended: false,
    },
    {
      range: "3 courses",
      title: "Balanced Learning",
      description: "Perfect balance between variety and focus - ideal for most students",
      color: "#088a6a",
      icon: BarChart3,
      isRecommended: true,
    },
    {
      range: "4-5 courses",
      title: "Broad Coverage",
      description: "Quick review sessions across multiple subjects for comprehensive learning",
      color: "#06B6D4",
      icon: Users,
      isRecommended: false,
    },
  ]

  const getSelectedRecommendation = () => {
    if (dailyCourseLimit <= 2) return 0
    if (dailyCourseLimit === 3) return 1
    return 2
  }

  const handleNext = () => {
    const studyData = {
      courses: coursesData,
      dailyCourseLimit: dailyCourseLimit,
      recommendation: recommendations[getSelectedRecommendation()],
    }

    console.log("Study data to save:", studyData)

    Alert.alert(
      "🎯 Daily Limit Set!",
      `You'll study ${dailyCourseLimit} course${dailyCourseLimit > 1 ? "s" : ""} per day. Ready to set your study preferences?`,
      [
        {
          text: "Continue",
          onPress: () => {
            navigation.navigate('AvailabilityTime', { studyData });
          },
        },
      ],
    )
  }

  const getCourseText = () => {
    return dailyCourseLimit === 1 ? "Course" : "Courses"
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
          <Text style={styles.headerTitle}>Set Daily Limits</Text>
          <Text style={styles.headerSubtitle}>Step 2 of 4</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.coursesCountBadge}>
            <Text style={styles.coursesCountText}>{coursesData.length} Courses</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressSteps}>
            {progressSteps.map((step, index) => (
              <React.Fragment key={index}>
                <ProgressStep {...step} />
                {index < progressSteps.length - 1 && <View style={styles.progressLine} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeHeader}>
            <Target color="#088a6a" size={32} />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>How Many Courses Per Day? 📚</Text>
              <Text style={styles.welcomeSubtitle}>
                Choose the optimal number of courses to study each day based on your schedule and learning style.
              </Text>
            </View>
          </View>
        </View>

        {/* Daily Limit Selector */}
        <View style={styles.dailyLimitContainer}>
          <View style={styles.dailyLimitCard}>
            <View style={styles.dailyLimitHeader}>
              <View style={styles.dailyLimitIcon}>
                <Brain color="#088a6a" size={32} />
              </View>
              <Text style={styles.dailyLimitTitle}>
                {dailyCourseLimit} {getCourseText()} Per Day
              </Text>
              <Text style={styles.dailyLimitSubtitle}>Perfect for maintaining consistent progress</Text>
            </View>

            <View style={styles.sliderContainer}>
              <CustomSlider
                style={styles.slider}
                minimumValue={1}
                maximumValue={5}
                step={1}
                value={dailyCourseLimit}
                onValueChange={setDailyCourseLimit}
                minimumTrackTintColor="#088a6a"
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor="#088a6a"
              />
              <View style={styles.sliderLabels}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[styles.sliderLabel, dailyCourseLimit === num && styles.activeSliderLabel]}
                    onPress={() => setDailyCourseLimit(num)}
                  >
                    <Text style={[styles.sliderLabelText, dailyCourseLimit === num && styles.activeSliderLabelText]}>
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Recommendations Section */}
        <View style={styles.recommendationsContainer}>
          <View style={styles.recommendationsHeader}>
            <Lightbulb color="#F59E0B" size={24} />
            <Text style={styles.recommendationsTitle}>Smart Recommendations</Text>
          </View>
          <Text style={styles.recommendationsSubtitle}>Based on learning science and student success data</Text>

          <View style={styles.recommendationsList}>
            {recommendations.map((rec, index) => (
              <RecommendationCard key={index} {...rec} isSelected={getSelectedRecommendation() === index} />
            ))}
          </View>
        </View>

        {/* Study Impact Card */}
        <View style={styles.impactCard}>
          <View style={styles.impactHeader}>
            <Zap color="#088a6a" size={20} />
            <Text style={styles.impactTitle}>Your Study Impact</Text>
          </View>
          <View style={styles.impactStats}>
            <View style={styles.impactStat}>
              <Text style={styles.impactStatNumber}>{coursesData.length}</Text>
              <Text style={styles.impactStatLabel}>Total Courses</Text>
            </View>
            <View style={styles.impactStat}>
              <Text style={styles.impactStatNumber}>{dailyCourseLimit}</Text>
              <Text style={styles.impactStatLabel}>Daily Courses</Text>
            </View>
            <View style={styles.impactStat}>
              <Text style={styles.impactStatNumber}>{Math.ceil(coursesData.length / dailyCourseLimit)}</Text>
              <Text style={styles.impactStatLabel}>Study Cycles</Text>
            </View>
          </View>
        </View>

        {/* Extra space at bottom for button */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
          <View style={styles.nextButtonContent}>
            <Text style={styles.nextButtonText}>Continue to Preferences</Text>
            <TrendingUp color="#FFFFFF" size={20} />
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

  // Custom Slider Styles
  customSliderContainer: {
    height: 50,
    justifyContent: "center",
    marginBottom: 20,
  },
  customSliderTrack: {
    height: 8,
    borderRadius: 4,
    position: "relative",
    backgroundColor: "transparent",
  },
  customSliderTrackFill: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    borderRadius: 4,
  },
  customSliderTrackEmpty: {
    position: "absolute",
    right: 0,
    top: 0,
    height: "100%",
    borderRadius: 4,
    width: "100%",
  },
  customSliderThumb: {
    position: "absolute",
    top: -12,
    width: 32,
    height: 32,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 4,
    borderColor: "#FFFFFF",
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
  headerRight: {
    width: "auto",
  },
  coursesCountBadge: {
    backgroundColor: "#088a6a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  coursesCountText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  // Progress Indicator
  progressContainer: {
    backgroundColor: "transparent", // Added light gray background
    paddingVertical: 10,
    paddingHorizontal: 25,
    zIndex: 10,
  },
  progressSteps: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressStep: {
    alignItems: "center",
    flex: 1,
  },
  progressCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  activeProgressCircle: {
    backgroundColor: "#088a6a",
    borderColor: "#088a6a",
  },
  completedProgressCircle: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  progressTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
  },
  activeProgressTitle: {
    color: "#088a6a",
  },
  progressLine: {
    height: 2,
    backgroundColor: "#E5E7EB",
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 30,
  },

  // Scroll View
  scrollView: {
    flex: 1,
    zIndex: 5,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Welcome Card
  welcomeCard: {
    margin: 20,
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

  // Daily Limit Container
  dailyLimitContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dailyLimitCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20, // Reduced from 32
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    zIndex: 10,
  },
  dailyLimitHeader: {
    alignItems: "center",
    marginBottom: 20, // Reduced from 32
  },
  dailyLimitIcon: {
    width: 60, // Reduced from 80
    height: 60, // Reduced from 80
    borderRadius: 30, // Reduced from 40
    backgroundColor: "#088a6a10",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12, // Reduced from 16
  },
  dailyLimitTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#088a6a",
    marginBottom: 8,
    textAlign: "center",
  },
  dailyLimitSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },

  // Slider Styles
  sliderContainer: {
    paddingHorizontal: 8,
  },
  slider: {
    width: "100%",
    height: 50,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  sliderLabel: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  activeSliderLabel: {
    backgroundColor: "#088a6a",
  },
  sliderLabelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  activeSliderLabelText: {
    color: "#FFFFFF",
  },

  // Recommendations
  recommendationsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  recommendationsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8, // Reduced from 12
    gap: 12,
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  recommendationsSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },
  recommendationsList: {
    gap: 12,
  },
  recommendationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16, // Reduced from 20
    borderWidth: 2,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 10,
  },
  recommendationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  recommendationTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  recommendationRange: {
    fontSize: 16,
    fontWeight: "700",
  },
  recommendedBadge: {
    backgroundColor: "#088a6a",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recommendedText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },

  // Impact Card
  impactCard: {
    margin: 20,
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
  impactHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  impactStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  impactStat: {
    alignItems: "center",
  },
  impactStatNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#088a6a",
    marginBottom: 4,
  },
  impactStatLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },

  // Bottom Navigation
  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 30 : 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    zIndex: 20,
  },
  nextButton: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#088a6a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonContent: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
})

export default SetDailyLimitsScreen