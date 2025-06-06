"use client"

import { useState } from "react"
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
  Calendar,
  Clock,
  BookOpen,
  Sun,
  Moon,
  Coffee,
  Sunset,
  CalendarX,
  Bell,
  Plus,
  RotateCcw,
  GraduationCap,
  Target,
  Sparkles,
  BookOpenCheck,
  Timer,
  AlertCircle,
  CheckCircle2,
  Zap,
  TrendingUp,
} from "lucide-react-native"

const { width, height } = Dimensions.get("window")

// Days of the week with enhanced data
const daysOfWeek = [
  { key: "monday", label: "Mon", fullName: "Monday", icon: Sun, dayIndex: 1 },
  { key: "tuesday", label: "Tue", fullName: "Tuesday", icon: Sun, dayIndex: 2 },
  { key: "wednesday", label: "Wed", fullName: "Wednesday", icon: Sun, dayIndex: 3 },
  { key: "thursday", label: "Thu", fullName: "Thursday", icon: Sun, dayIndex: 4 },
  { key: "friday", label: "Fri", fullName: "Friday", icon: Coffee, dayIndex: 5 },
  { key: "saturday", label: "Sat", fullName: "Saturday", icon: Sunset, dayIndex: 6 },
  { key: "sunday", label: "Sun", fullName: "Sunday", icon: Moon, dayIndex: 0 },
]

// Sample schedule data
const sampleSchedule = {
  monday: [
    {
      id: 1,
      courseName: "Advanced Mathematics",
      startTime: "9:00 AM",
      endTime: "10:30 AM",
      difficulty: "hard",
      priority: "very_important",
      color: "#EF4444",
    },
    {
      id: 2,
      courseName: "Physics Lab",
      startTime: "2:00 PM",
      endTime: "4:00 PM",
      difficulty: "medium",
      priority: "important",
      color: "#F59E0B",
    },
  ],
  tuesday: [
    {
      id: 3,
      courseName: "Computer Science",
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      difficulty: "medium",
      priority: "important",
      color: "#088a6a",
    },
  ],
  wednesday: [
    {
      id: 4,
      courseName: "Chemistry",
      startTime: "9:00 AM",
      endTime: "10:30 AM",
      difficulty: "easy",
      priority: "medium",
      color: "#06B6D4",
    },
    {
      id: 5,
      courseName: "Literature",
      startTime: "3:00 PM",
      endTime: "4:30 PM",
      difficulty: "easy",
      priority: "less_important",
      color: "#8B5CF6",
    },
  ],
  thursday: [
    {
      id: 6,
      courseName: "Biology",
      startTime: "11:00 AM",
      endTime: "12:30 PM",
      difficulty: "medium",
      priority: "important",
      color: "#10B981",
    },
  ],
  friday: [
    {
      id: 7,
      courseName: "History",
      startTime: "1:00 PM",
      endTime: "2:30 PM",
      difficulty: "easy",
      priority: "medium",
      color: "#F97316",
    },
  ],
  saturday: [],
  sunday: [],
}

// Get current day of week
const getCurrentDay = () => {
  const today = new Date().getDay()
  const dayMap = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
  }
  return dayMap[today]
}

// Decorative Circle Component
const DecorativeCircle = ({ style }) => <View style={[styles.decorativeCircle, style]} />

// Course Card Component
const CourseCard = ({ course, index }) => {
  const getDifficultyIcon = () => {
    switch (course.difficulty) {
      case "easy":
        return <CheckCircle2 color="#10B981" size={16} />
      case "medium":
        return <AlertCircle color="#F59E0B" size={16} />
      case "hard":
        return <Zap color="#EF4444" size={16} />
      default:
        return <BookOpen color="#6B7280" size={16} />
    }
  }

  const getDuration = () => {
    const start = new Date(`2024-01-01 ${course.startTime}`)
    const end = new Date(`2024-01-01 ${course.endTime}`)
    const diffMinutes = (end - start) / (1000 * 60)
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60
    return hours > 0 ? `${hours}h ${minutes > 0 ? `${minutes}m` : ""}` : `${minutes}m`
  }

  return (
    <View style={[styles.courseCard, { borderLeftColor: course.color }]}>
      <View style={styles.courseCardHeader}>
        <View style={styles.courseCardLeft}>
          <View style={[styles.courseColorIndicator, { backgroundColor: course.color }]} />
          <View style={styles.courseInfo}>
            <Text style={styles.courseName}>{course.courseName}</Text>
            <View style={styles.courseMetadata}>
              <View style={styles.courseTime}>
                <Clock color="#6B7280" size={14} />
                <Text style={styles.courseTimeText}>
                  {course.startTime} - {course.endTime}
                </Text>
              </View>
              <View style={styles.courseDuration}>
                <Timer color="#6B7280" size={14} />
                <Text style={styles.courseDurationText}>{getDuration()}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.courseCardRight}>
          <View style={styles.difficultyBadge}>{getDifficultyIcon()}</View>
        </View>
      </View>
    </View>
  )
}

// Empty State Component
const EmptyState = ({ day }) => {
  const emptyStateData = {
    weekday: {
      icon: CalendarX,
      title: "No Classes Today! 🎉",
      subtitle: "Perfect day for review or personal projects",
      color: "#088a6a",
    },
    weekend: {
      icon: Sunset,
      title: "Weekend Vibes! 🌅",
      subtitle: "Time to relax and recharge for the week ahead",
      color: "#F59E0B",
    },
  }

  const isWeekend = day === "saturday" || day === "sunday"
  const data = isWeekend ? emptyStateData.weekend : emptyStateData.weekday
  const IconComponent = data.icon

  return (
    <View style={styles.emptyState}>
      <View style={[styles.emptyStateIcon, { backgroundColor: data.color + "20" }]}>
        <IconComponent color={data.color} size={32} />
      </View>
      <Text style={styles.emptyStateTitle}>{data.title}</Text>
      <Text style={styles.emptyStateSubtitle}>{data.subtitle}</Text>
      <View style={styles.emptyStateActions}>
        <TouchableOpacity style={styles.emptyActionButton}>
          <BookOpenCheck color="#088a6a" size={16} />
          <Text style={styles.emptyActionText}>Review Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emptyActionButton}>
          <Target color="#088a6a" size={16} />
          <Text style={styles.emptyActionText}>Set Goals</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// Semester End Modal Component
const SemesterEndModal = ({ visible, onConfirm, onCancel }) => (
  <View style={[styles.modalOverlay, { display: visible ? "flex" : "none" }]}>
    <View style={styles.semesterModalContent}>
      <View style={styles.semesterModalHeader}>
        <GraduationCap color="#088a6a" size={32} />
        <Text style={styles.semesterModalTitle}>End Semester? 🎓</Text>
      </View>
      <Text style={styles.semesterModalText}>
        Are you sure you want to mark this semester as ended? This will clear all your current schedules and you can
        start fresh for the next semester.
      </Text>
      <View style={styles.semesterModalActions}>
        <TouchableOpacity style={styles.semesterCancelButton} onPress={onCancel}>
          <Text style={styles.semesterCancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.semesterConfirmButton} onPress={onConfirm}>
          <Text style={styles.semesterConfirmText}>End Semester</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)

const TimetableScreen = ({ navigation, route }) => {
  const [selectedDay, setSelectedDay] = useState(getCurrentDay())
  const [schedule, setSchedule] = useState(sampleSchedule)
  const [studyReminders, setStudyReminders] = useState(true)
  const [showSemesterModal, setShowSemesterModal] = useState(false)

  // Get study data from previous screens
  const finalData = route?.params?.finalData || {}

  // Generate random circles for decoration
  const decorativeCircles = [
    { size: 160, top: 80, right: -60, opacity: 0.04, color: "#088a6a" },
    { size: 120, top: height * 0.6, left: -40, opacity: 0.03, color: "#F59E0B" },
    { size: 100, bottom: 150, right: -30, opacity: 0.05, color: "#06B6D4" },
    { size: 80, top: height * 0.4, left: 20, opacity: 0.03, color: "#8B5CF6" },
    { size: 90, bottom: 200, left: -25, opacity: 0.04, color: "#EF4444" },
  ]

  const handleSemesterEnd = () => {
    setSchedule({
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    })
    setShowSemesterModal(false)
    Alert.alert("🎉 Semester Ended!", "All schedules cleared. Ready for a fresh start next semester!", [
      { text: "Great!" },
    ])
  }

  const handleRegenerateSchedule = () => {
    Alert.alert(
      "🔄 Regenerate Schedule",
      "This will create a new AI-powered schedule based on your preferences. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Regenerate",
          onPress: () => {
            // navigation.navigate('AITimetableIntro');
            console.log("Navigating to regenerate schedule")
          },
        },
      ],
    )
  }

  const navigateToAIIntro = () => {
    // navigation.navigate('AITimetableIntro');
    console.log("Navigating to AI Timetable Intro")
  }

  const selectedDayData = daysOfWeek.find((day) => day.key === selectedDay)
  const daySchedule = schedule[selectedDay] || []
  const totalCourses = Object.values(schedule).flat().length
  const todaySchedule = schedule[getCurrentDay()] || []

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
        <View style={styles.headerLeft}>
          <View style={styles.headerIcon}>
            <Calendar color="#088a6a" size={24} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Your Timetable</Text>
            <Text style={styles.headerSubtitle}>{totalCourses} courses this semester</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.endSemesterButton} onPress={() => setShowSemesterModal(true)}>
          <GraduationCap color="#EF4444" size={18} />
          <Text style={styles.endSemesterText}>End Semester</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Banner */}
        <View style={styles.successBanner}>
          <View style={styles.successBannerContent}>
            <Sparkles color="#088a6a" size={24} />
            <View style={styles.successTextContainer}>
              <Text style={styles.successTitle}>Timetable Generated! ✨</Text>
              <Text style={styles.successSubtitle}>Your personalized study schedule is ready</Text>
            </View>
            <TouchableOpacity style={styles.regenerateButton} onPress={handleRegenerateSchedule}>
              <RotateCcw color="#088a6a" size={16} />
              <Text style={styles.regenerateText}>Regenerate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Overview */}
        <View style={styles.weeklyOverview}>
          <Text style={styles.weeklyTitle}>Weekly Overview</Text>
          <View style={styles.weeklyStats}>
            <View style={styles.statCard}>
              <BookOpen color="#088a6a" size={20} />
              <Text style={styles.statNumber}>{totalCourses}</Text>
              <Text style={styles.statLabel}>Total Courses</Text>
            </View>
            <View style={styles.statCard}>
              <Clock color="#F59E0B" size={20} />
              <Text style={styles.statNumber}>{todaySchedule.length}</Text>
              <Text style={styles.statLabel}>Today's Classes</Text>
            </View>
            <View style={styles.statCard}>
              <TrendingUp color="#06B6D4" size={20} />
              <Text style={styles.statNumber}>{Object.values(schedule).filter((day) => day.length > 0).length}</Text>
              <Text style={styles.statLabel}>Active Days</Text>
            </View>
          </View>
        </View>

        {/* Day Tabs */}
        <View style={styles.dayTabsContainer}>
          <Text style={styles.dayTabsTitle}>Daily Schedule</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayTabsScroll}>
            <View style={styles.dayTabs}>
              {daysOfWeek.map((day) => {
                const dayScheduleCount = schedule[day.key]?.length || 0
                const isToday = day.key === getCurrentDay()
                return (
                  <TouchableOpacity
                    key={day.key}
                    style={[
                      styles.dayTab,
                      selectedDay === day.key && styles.activeDayTab,
                      isToday && styles.todayDayTab,
                    ]}
                    onPress={() => setSelectedDay(day.key)}
                  >
                    <day.icon color={selectedDay === day.key ? "#FFFFFF" : isToday ? "#088a6a" : "#6B7280"} size={16} />
                    <Text
                      style={[
                        styles.dayTabText,
                        selectedDay === day.key && styles.activeDayTabText,
                        isToday && styles.todayDayTabText,
                      ]}
                    >
                      {day.label}
                    </Text>
                    {isToday && <View style={styles.todayIndicator} />}
                    {dayScheduleCount > 0 && (
                      <View style={styles.dayTabBadge}>
                        <Text style={styles.dayTabBadgeText}>{dayScheduleCount}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )
              })}
            </View>
          </ScrollView>
        </View>

        {/* Schedule Content */}
        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleHeader}>
            <View style={styles.scheduleHeaderLeft}>
              <View style={styles.dayIconContainer}>
                <selectedDayData.icon color="#088a6a" size={24} />
              </View>
              <View>
                <Text style={styles.scheduleTitle}>{selectedDayData.fullName}'s Schedule</Text>
                <Text style={styles.scheduleSubtitle}>
                  {daySchedule.length > 0
                    ? `${daySchedule.length} class${daySchedule.length !== 1 ? "es" : ""} scheduled`
                    : "No classes scheduled"}
                </Text>
              </View>
            </View>
            {selectedDay === getCurrentDay() && (
              <View style={styles.todayBadge}>
                <Text style={styles.todayBadgeText}>Today</Text>
              </View>
            )}
          </View>

          {/* Schedule List or Empty State */}
          {daySchedule.length > 0 ? (
            <View style={styles.scheduleList}>
              {daySchedule.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </View>
          ) : (
            <EmptyState day={selectedDay} />
          )}
        </View>

        {/* Study Reminders */}
        <View style={styles.studyRemindersCard}>
          <View style={styles.studyRemindersHeader}>
            <View style={styles.studyRemindersLeft}>
              <Bell color="#088a6a" size={20} />
              <View>
                <Text style={styles.studyRemindersTitle}>Study Reminders</Text>
                <Text style={styles.studyRemindersSubtitle}>Get notified before each session</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.toggleSwitch, studyReminders && styles.toggleSwitchActive]}
              onPress={() => setStudyReminders(!studyReminders)}
            >
              <View style={[styles.toggleThumb, studyReminders && styles.toggleThumbActive]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Extra space at bottom */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.floatingAddButton} onPress={navigateToAIIntro} activeOpacity={0.8}>
        <Plus color="#FFFFFF" size={24} />
      </TouchableOpacity>

      {/* Semester End Modal */}
      <SemesterEndModal
        visible={showSemesterModal}
        onConfirm={handleSemesterEnd}
        onCancel={() => setShowSemesterModal(false)}
      />
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#088a6a10",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  endSemesterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  endSemesterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#EF4444",
  },

  // Scroll View
  scrollView: {
    flex: 1,
    zIndex: 5,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Success Banner
  successBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#088a6a10",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#088a6a20",
    zIndex: 10,
  },
  successBannerContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  successTextContainer: {
    flex: 1,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#088a6a",
    marginBottom: 2,
  },
  successSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  regenerateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: "#088a6a",
  },
  regenerateText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#088a6a",
  },

  // Weekly Overview
  weeklyOverview: {
    marginHorizontal: 20,
    marginBottom: 20,
    zIndex: 10,
  },
  weeklyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  weeklyStats: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },

  // Day Tabs
  dayTabsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    zIndex: 10,
  },
  dayTabsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
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
    position: "relative",
  },
  activeDayTab: {
    backgroundColor: "#088a6a",
  },
  todayDayTab: {
    backgroundColor: "#088a6a10",
    borderWidth: 1,
    borderColor: "#088a6a",
  },
  dayTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  activeDayTabText: {
    color: "#FFFFFF",
  },
  todayDayTabText: {
    color: "#088a6a",
  },
  todayIndicator: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
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

  // Schedule Container
  scheduleContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 10,
  },
  scheduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  scheduleHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  dayIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#088a6a10",
    justifyContent: "center",
    alignItems: "center",
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  scheduleSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  todayBadge: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  todayBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  // Schedule List
  scheduleList: {
    gap: 12,
  },

  // Course Card
  courseCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  courseCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  courseCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  courseColorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  courseMetadata: {
    flexDirection: "row",
    gap: 16,
  },
  courseTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  courseTimeText: {
    fontSize: 14,
    color: "#6B7280",
  },
  courseDuration: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  courseDurationText: {
    fontSize: 14,
    color: "#6B7280",
  },
  courseCardRight: {
    alignItems: "center",
  },
  difficultyBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  // Empty State
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  emptyStateActions: {
    flexDirection: "row",
    gap: 12,
  },
  emptyActionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#088a6a10",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  emptyActionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#088a6a",
  },

  // Study Reminders
  studyRemindersCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 10,
  },
  studyRemindersHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  studyRemindersLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  studyRemindersTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  studyRemindersSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  toggleSwitch: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleSwitchActive: {
    backgroundColor: "#088a6a",
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },

  // Floating Add Button
  floatingAddButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#088a6a",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 20,
  },

  // Semester Modal
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  semesterModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    maxWidth: 350,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  semesterModalHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  semesterModalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginTop: 12,
    textAlign: "center",
  },
  semesterModalText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  semesterModalActions: {
    flexDirection: "row",
    gap: 12,
  },
  semesterCancelButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  semesterCancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  semesterConfirmButton: {
    flex: 1,
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  semesterConfirmText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
})

export default TimetableScreen