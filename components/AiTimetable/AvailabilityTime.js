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
  Modal,
  Animated,
} from "react-native"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  TrendingUp,
  Timer,
  Sun,
  Moon,
  Coffee,
  Sunset,
  ChevronDown,
  Brain,
  Sparkles,
  Zap,
  Target,
  BookOpenCheck,
} from "lucide-react-native"

const { width, height } = Dimensions.get("window")

// Time options for dropdowns
const timeOptions = [
  "6:00 AM",
  "6:30 AM",
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
]

// Days of the week
const daysOfWeek = [
  { key: "monday", label: "Mon", fullName: "Monday", icon: Sun },
  { key: "tuesday", label: "Tue", fullName: "Tuesday", icon: Sun },
  { key: "wednesday", label: "Wed", fullName: "Wednesday", icon: Sun },
  { key: "thursday", label: "Thu", fullName: "Thursday", icon: Sun },
  { key: "friday", label: "Fri", fullName: "Friday", icon: Coffee },
  { key: "saturday", label: "Sat", fullName: "Saturday", icon: Sunset },
  { key: "sunday", label: "Sun", fullName: "Sunday", icon: Moon },
]

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

// Time Picker Modal Component
const TimePickerModal = ({ visible, onClose, onSelect, selectedTime, title }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <Text style={styles.modalCloseText}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.timeList} showsVerticalScrollIndicator={false}>
          {timeOptions.map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.timeOption, selectedTime === time && styles.selectedTimeOption]}
              onPress={() => {
                onSelect(time)
                onClose()
              }}
            >
              <Text style={[styles.timeOptionText, selectedTime === time && styles.selectedTimeOptionText]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  </Modal>
)

// Time Slot Component
const TimeSlot = ({ slot, onUpdate, onDelete, canDelete }) => {
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  return (
    <View style={styles.timeSlot}>
      <View style={styles.timeSlotRow}>
        <View style={styles.timePickerContainer}>
          <Text style={styles.timeLabel}>Start Time</Text>
          <TouchableOpacity style={styles.timePicker} onPress={() => setShowStartPicker(true)}>
            <Text style={styles.timePickerText}>{slot.startTime}</Text>
            <ChevronDown color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.timePickerContainer}>
          <Text style={styles.timeLabel}>End Time</Text>
          <TouchableOpacity style={styles.timePicker} onPress={() => setShowEndPicker(true)}>
            <Text style={styles.timePickerText}>{slot.endTime}</Text>
            <ChevronDown color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>

        {canDelete && (
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Trash2 color="#EF4444" size={20} />
          </TouchableOpacity>
        )}
      </View>

      <TimePickerModal
        visible={showStartPicker}
        onClose={() => setShowStartPicker(false)}
        onSelect={(time) => onUpdate({ ...slot, startTime: time })}
        selectedTime={slot.startTime}
        title="Select Start Time"
      />

      <TimePickerModal
        visible={showEndPicker}
        onClose={() => setShowEndPicker(false)}
        onSelect={(time) => onUpdate({ ...slot, endTime: time })}
        selectedTime={slot.endTime}
        title="Select End Time"
      />
    </View>
  )
}

// Decorative Circle Component
const DecorativeCircle = ({ style }) => <View style={[styles.decorativeCircle, style]} />

// AI Loading Modal Component
const AILoadingModal = ({ visible, progress, currentStep }) => {
  const spinValue = new Animated.Value(0)
  const pulseValue = new Animated.Value(1)
  const sparkleValue = new Animated.Value(0)

  React.useEffect(() => {
    if (visible) {
      // Spinning animation
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      )

      // Pulse animation
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      )

      // Sparkle animation
      const sparkleAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(sparkleValue, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(sparkleValue, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      )

      spinAnimation.start()
      pulseAnimation.start()
      sparkleAnimation.start()

      return () => {
        spinAnimation.stop()
        pulseAnimation.stop()
        sparkleAnimation.stop()
      }
    }
  }, [visible])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const sparkleOpacity = sparkleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1, 0.3],
  })

  const loadingSteps = [
    {
      title: "Analyzing Your Courses",
      subtitle: "Processing difficulty levels and priorities",
      icon: BookOpenCheck,
      color: "#088a6a",
    },
    {
      title: "Optimizing Study Times",
      subtitle: "Matching courses with your availability",
      icon: Clock,
      color: "#F59E0B",
    },
    {
      title: "Balancing Workload",
      subtitle: "Ensuring optimal learning distribution",
      icon: Target,
      color: "#06B6D4",
    },
    {
      title: "Generating Schedule",
      subtitle: "Creating your personalized timetable",
      icon: Sparkles,
      color: "#8B5CF6",
    },
    {
      title: "Finalizing Details",
      subtitle: "Adding smart recommendations",
      icon: Brain,
      color: "#EF4444",
    },
  ]

  const currentStepData = loadingSteps[currentStep] || loadingSteps[0]
  const CurrentIcon = currentStepData.icon

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.loadingModalOverlay}>
        <View style={styles.loadingModalContent}>
          {/* Header */}
          <View style={styles.loadingHeader}>
            <Text style={styles.loadingTitle}>🤖 AI Schedule Generator</Text>
            <Text style={styles.loadingSubtitle}>Creating your perfect study timetable</Text>
          </View>

          {/* Main Loading Animation */}
          <View style={styles.loadingAnimationContainer}>
            {/* Outer Ring */}
            <Animated.View
              style={[
                styles.loadingRing,
                {
                  transform: [{ rotate: spin }, { scale: pulseValue }],
                },
              ]}
            >
              <View style={styles.loadingRingInner} />
            </Animated.View>

            {/* Progress Ring */}
            <View style={styles.progressRingContainer}>
              <View style={styles.progressRing}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      transform: [{ rotate: `${(progress / 100) * 360}deg` }],
                    },
                  ]}
                />
              </View>
            </View>

            {/* Center Icon */}
            <Animated.View
              style={[
                styles.loadingIconContainer,
                {
                  backgroundColor: currentStepData.color + "20",
                  transform: [{ scale: pulseValue }],
                },
              ]}
            >
              <CurrentIcon color={currentStepData.color} size={32} />
            </Animated.View>

            {/* Sparkles */}
            <Animated.View style={[styles.sparkle, styles.sparkle1, { opacity: sparkleOpacity }]}>
              <Sparkles color="#FFD700" size={16} />
            </Animated.View>
            <Animated.View style={[styles.sparkle, styles.sparkle2, { opacity: sparkleOpacity }]}>
              <Zap color="#FF6B6B" size={14} />
            </Animated.View>
            <Animated.View style={[styles.sparkle, styles.sparkle3, { opacity: sparkleOpacity }]}>
              <Sparkles color="#4ECDC4" size={12} />
            </Animated.View>
          </View>

          {/* Progress Info */}
          <View style={styles.progressInfo}>
            <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
            <Text style={styles.currentStepTitle}>{currentStepData.title}</Text>
            <Text style={styles.currentStepSubtitle}>{currentStepData.subtitle}</Text>
          </View>

          {/* Steps Indicator */}
          <View style={styles.stepsIndicator}>
            {loadingSteps.map((step, index) => (
              <View
                key={index}
                style={[
                  styles.stepDot,
                  {
                    backgroundColor: index <= currentStep ? step.color : "#E5E7EB",
                  },
                ]}
              />
            ))}
          </View>

          {/* Fun Facts */}
          <View style={styles.funFactsContainer}>
            <Text style={styles.funFactTitle}>💡 Did you know?</Text>
            <Text style={styles.funFactText}>
              {currentStep === 0 && "Spaced repetition can improve retention by up to 200%!"}
              {currentStep === 1 && "Your brain is most alert 2-4 hours after waking up!"}
              {currentStep === 2 && "Taking breaks every 25-30 minutes boosts productivity!"}
              {currentStep === 3 && "Consistent study schedules improve long-term memory!"}
              {currentStep === 4 && "Personalized schedules increase study success by 40%!"}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const SetAvailabilityScreen = ({ navigation, route }) => {
  const [selectedDay, setSelectedDay] = useState("monday")
  const [availability, setAvailability] = useState({
    monday: [{ id: 1, startTime: "9:00 AM", endTime: "11:00 AM" }],
    tuesday: [{ id: 1, startTime: "9:00 AM", endTime: "11:00 AM" }],
    wednesday: [{ id: 1, startTime: "9:00 AM", endTime: "11:00 AM" }],
    thursday: [{ id: 1, startTime: "9:00 AM", endTime: "11:00 AM" }],
    friday: [{ id: 1, startTime: "9:00 AM", endTime: "11:00 AM" }],
    saturday: [{ id: 1, startTime: "10:00 AM", endTime: "12:00 PM" }],
    sunday: [{ id: 1, startTime: "10:00 AM", endTime: "12:00 PM" }],
  })

  const [showLoadingModal, setShowLoadingModal] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [currentLoadingStep, setCurrentLoadingStep] = useState(0)

  // Get study data from previous screen
  const studyData = route?.params?.studyData || {}

  // Generate random circles for decoration
  const decorativeCircles = [
    { size: 180, top: 100, right: -70, opacity: 0.06, color: "#FF6B6B" },
    { size: 140, top: height * 0.6, left: -50, opacity: 0.05, color: "#4ECDC4" },
    { size: 100, bottom: 200, right: -30, opacity: 0.07, color: "#45B7D1" },
    { size: 120, top: height * 0.4, left: 10, opacity: 0.04, color: "#96CEB4" },
    { size: 90, bottom: 100, left: -20, opacity: 0.06, color: "#FFEAA7" },
  ]

  const progressSteps = [
    { title: "Add Courses", icon: BookOpen, isActive: false, isCompleted: true },
    { title: "Set Limits", icon: Timer, isActive: false, isCompleted: true },
    { title: "Set Times", icon: Clock, isActive: true, isCompleted: false },
    { title: "Schedule", icon: Calendar, isActive: false, isCompleted: false },
  ]

  const addTimeSlot = (day) => {
    const newSlot = {
      id: Date.now(),
      startTime: "9:00 AM",
      endTime: "11:00 AM",
    }
    setAvailability((prev) => ({
      ...prev,
      [day]: [...prev[day], newSlot],
    }))
  }

  const updateTimeSlot = (day, slotId, updatedSlot) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].map((slot) => (slot.id === slotId ? updatedSlot : slot)),
    }))
  }

  const deleteTimeSlot = (day, slotId) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].filter((slot) => slot.id !== slotId),
    }))
  }

  const handleNext = () => {
    setShowLoadingModal(true)
    setLoadingProgress(0)
    setCurrentLoadingStep(0)

    // Simulate AI processing with realistic timing
    const steps = [
      { duration: 1500, progress: 20 },
      { duration: 2000, progress: 40 },
      { duration: 1800, progress: 60 },
      { duration: 2200, progress: 80 },
      { duration: 1000, progress: 100 },
    ]

    let totalTime = 0
    steps.forEach((step, index) => {
      totalTime += step.duration
      setTimeout(() => {
        setLoadingProgress(step.progress)
        setCurrentLoadingStep(index)

        if (index === steps.length - 1) {
          // Final step - close modal and show success
          setTimeout(() => {
            setShowLoadingModal(false)
            const finalData = {
              ...studyData,
              availability: availability,
            }

            console.log("Final study data:", finalData)

            Alert.alert(
              "🎯 Schedule Generated!",
              "Your AI-powered study schedule is ready! Let's review your personalized timetable.",
              [
                {
                  text: "View Schedule",
                  onPress: () => {
                    navigation.navigate('PersonlisedTimetable', { finalData });
                  },
                },
              ],
            )
          }, 1000)
        }
      }, totalTime)
    })
  }

  const getTotalHoursForDay = (day) => {
    const slots = availability[day]
    let totalMinutes = 0

    slots.forEach((slot) => {
      const start = new Date(`2024-01-01 ${slot.startTime}`)
      const end = new Date(`2024-01-01 ${slot.endTime}`)
      totalMinutes += (end - start) / (1000 * 60)
    })

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return hours > 0 ? `${hours}h ${minutes > 0 ? `${minutes}m` : ""}` : `${minutes}m`
  }

  const selectedDayData = daysOfWeek.find((day) => day.key === selectedDay)

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
          <Text style={styles.headerTitle}>Set Availability</Text>
          <Text style={styles.headerSubtitle}>Step 3 of 4</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.totalTimeBadge}>
            <Text style={styles.totalTimeText}>{getTotalHoursForDay(selectedDay)}</Text>
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
            <Clock color="#088a6a" size={32} />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>When Are You Available? ⏰</Text>
              <Text style={styles.welcomeSubtitle}>
                Set your study times for each day. You can add multiple time slots per day to fit your schedule.
              </Text>
            </View>
          </View>
        </View>

        {/* Day Tabs */}
        <View style={styles.dayTabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayTabsScroll}>
            <View style={styles.dayTabs}>
              {daysOfWeek.map((day) => (
                <TouchableOpacity
                  key={day.key}
                  style={[styles.dayTab, selectedDay === day.key && styles.activeDayTab]}
                  onPress={() => setSelectedDay(day.key)}
                >
                  <day.icon color={selectedDay === day.key ? "#FFFFFF" : "#6B7280"} size={16} />
                  <Text style={[styles.dayTabText, selectedDay === day.key && styles.activeDayTabText]}>
                    {day.label}
                  </Text>
                  <View style={styles.dayTabBadge}>
                    <Text style={styles.dayTabBadgeText}>{availability[day.key].length}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Availability Card */}
        <View style={styles.availabilityCard}>
          <View style={styles.availabilityHeader}>
            <View style={styles.availabilityTitleContainer}>
              <View style={styles.dayIconContainer}>
                <selectedDayData.icon color="#088a6a" size={24} />
              </View>
              <View>
                <Text style={styles.availabilityTitle}>{selectedDayData.fullName}'s Schedule</Text>
                <Text style={styles.availabilitySubtitle}>
                  {availability[selectedDay].length} time slot{availability[selectedDay].length !== 1 ? "s" : ""} •{" "}
                  {getTotalHoursForDay(selectedDay)} total
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.timeSlotsContainer}>
            {availability[selectedDay].map((slot, index) => (
              <TimeSlot
                key={slot.id}
                slot={slot}
                onUpdate={(updatedSlot) => updateTimeSlot(selectedDay, slot.id, updatedSlot)}
                onDelete={() => deleteTimeSlot(selectedDay, slot.id)}
                canDelete={availability[selectedDay].length > 1}
              />
            ))}

            <TouchableOpacity style={styles.addTimeSlotButton} onPress={() => addTimeSlot(selectedDay)}>
              <Plus color="#088a6a" size={20} />
              <Text style={styles.addTimeSlotText}>Add Time Slot</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsCard}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.quickActionsList}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => {
                const weekdaySchedule = availability.monday
                setAvailability((prev) => ({
                  ...prev,
                  tuesday: [...weekdaySchedule],
                  wednesday: [...weekdaySchedule],
                  thursday: [...weekdaySchedule],
                  friday: [...weekdaySchedule],
                }))
                Alert.alert("✅ Applied", "Monday's schedule copied to all weekdays!")
              }}
            >
              <Text style={styles.quickActionText}>Copy to Weekdays</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => {
                const currentSchedule = availability[selectedDay]
                const allDays = Object.keys(availability)
                const newAvailability = {}
                allDays.forEach((day) => {
                  newAvailability[day] = [...currentSchedule]
                })
                setAvailability(newAvailability)
                Alert.alert("✅ Applied", `${selectedDayData.fullName}'s schedule copied to all days!`)
              }}
            >
              <Text style={styles.quickActionText}>Copy to All Days</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Extra space at bottom for button */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
          <View style={styles.nextButtonContent}>
            <Text style={styles.nextButtonText}>Create My Schedule</Text>
            <TrendingUp color="#FFFFFF" size={20} />
          </View>
        </TouchableOpacity>
      </View>

      {/* AI Loading Modal */}
      <AILoadingModal visible={showLoadingModal} progress={loadingProgress} currentStep={currentLoadingStep} />
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
  headerRight: {
    width: "auto",
  },
  totalTimeBadge: {
    backgroundColor: "#088a6a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  totalTimeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  // Progress Indicator
  progressContainer: {
    backgroundColor: "transparent",
    paddingVertical: 20,
    paddingHorizontal: 20,
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

  // Day Tabs
  dayTabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    zIndex: 10,
  },
  dayTabsScroll: {
    flexGrow: 0,
  },
  dayTabs: {
    flexDirection: "row",
    gap: 8,
  },
  dayTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    gap: 6,
    minWidth: 80,
  },
  activeDayTab: {
    backgroundColor: "#088a6a",
  },
  dayTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  activeDayTabText: {
    color: "#FFFFFF",
  },
  dayTabBadge: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
  },
  dayTabBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#088a6a",
  },

  // Availability Card
  availabilityCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
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
  availabilityHeader: {
    marginBottom: 20,
  },
  availabilityTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dayIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#088a6a10",
    justifyContent: "center",
    alignItems: "center",
  },
  availabilityTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  availabilitySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },

  // Time Slots
  timeSlotsContainer: {
    gap: 16,
  },
  timeSlot: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  timeSlotRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  timePickerContainer: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  timePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  timePickerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  deleteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },

  // Add Time Slot Button
  addTimeSlotButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#088a6a10",
    borderWidth: 2,
    borderColor: "#088a6a",
    borderStyle: "dashed",
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
  },
  addTimeSlotText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#088a6a",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.6,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseText: {
    fontSize: 16,
    color: "#6B7280",
  },
  timeList: {
    maxHeight: height * 0.4,
  },
  timeOption: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  selectedTimeOption: {
    backgroundColor: "#088a6a10",
  },
  timeOptionText: {
    fontSize: 16,
    color: "#111827",
  },
  selectedTimeOptionText: {
    color: "#088a6a",
    fontWeight: "600",
  },

  // Quick Actions
  quickActionsCard: {
    marginHorizontal: 20,
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
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  quickActionsList: {
    flexDirection: "row",
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
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

  // Loading Modal Styles
  loadingModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  loadingModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  loadingHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  loadingSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  loadingAnimationContainer: {
    position: "relative",
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  loadingRing: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#E5E7EB",
    borderTopColor: "#088a6a",
    borderRightColor: "#088a6a",
  },
  loadingRingInner: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "transparent",
    borderTopColor: "#10B981",
    opacity: 0.5,
  },
  progressRingContainer: {
    position: "absolute",
    width: 100,
    height: 100,
  },
  progressRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#F3F4F6",
    overflow: "hidden",
  },
  progressFill: {
    position: "absolute",
    top: -2,
    left: -2,
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 4,
    borderColor: "transparent",
    borderTopColor: "#088a6a",
    borderRightColor: "#088a6a",
  },
  loadingIconContainer: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#088a6a20",
  },
  sparkle: {
    position: "absolute",
  },
  sparkle1: {
    top: 10,
    right: 15,
  },
  sparkle2: {
    bottom: 15,
    left: 10,
  },
  sparkle3: {
    top: 20,
    left: 20,
  },
  progressInfo: {
    alignItems: "center",
    marginBottom: 24,
  },
  progressPercentage: {
    fontSize: 32,
    fontWeight: "700",
    color: "#088a6a",
    marginBottom: 8,
  },
  currentStepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
    textAlign: "center",
  },
  currentStepSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  stepsIndicator: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  funFactsContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    alignItems: "center",
  },
  funFactTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#088a6a",
    marginBottom: 8,
  },
  funFactText: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
  },
})

export default SetAvailabilityScreen