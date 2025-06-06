import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Calendar,
  ChevronDown,
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  Settings,
  Target,
  Zap,
  Star,
  Award,
  Brain,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// Dropdown options with enhanced styling
const DIFFICULTY_OPTIONS = [
  { label: 'Easy', value: 'easy', color: '#10B981', icon: '😊' },
  { label: 'Medium', value: 'medium', color: '#F59E0B', icon: '🤔' },
  { label: 'Hard', value: 'hard', color: '#EF4444', icon: '😤' },
];

const PRIORITY_OPTIONS = [
  { label: 'Very Important', value: 'very_important', color: '#EF4444', icon: '🔥' },
  { label: 'Important', value: 'important', color: '#F59E0B', icon: '⭐' },
  { label: 'Medium', value: 'medium', color: '#06B6D4', icon: '📚' },
  { label: 'Less Important', value: 'less_important', color: '#9CA3AF', icon: '📝' },
];

// Decorative Circle Component
const DecorativeCircle = ({ style }) => (
  <View style={[styles.decorativeCircle, style]} />
);

// Custom Slider Component (to replace the problematic one)
const CustomSlider = ({ 
  minimumValue, 
  maximumValue, 
  step, 
  value, 
  onValueChange, 
  minimumTrackTintColor, 
  maximumTrackTintColor, 
  thumbTintColor,
  style 
}) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  
  const handleLayout = (event) => {
    setSliderWidth(event.nativeEvent.layout.width);
  };

  const handlePress = (event) => {
    const { locationX } = event.nativeEvent;
    const percentage = locationX / sliderWidth;
    const range = maximumValue - minimumValue;
    const newValue = minimumValue + (percentage * range);
    const steppedValue = Math.round(newValue / step) * step;
    const clampedValue = Math.max(minimumValue, Math.min(maximumValue, steppedValue));
    onValueChange(clampedValue);
  };

  const thumbPosition = ((value - minimumValue) / (maximumValue - minimumValue)) * 100;

  return (
    <View style={[styles.customSliderContainer, style]} onLayout={handleLayout}>
      <TouchableOpacity 
        style={styles.customSliderTrack} 
        onPress={handlePress}
        activeOpacity={1}
      >
        <View style={[styles.customSliderTrackFill, { 
          width: `${thumbPosition}%`,
          backgroundColor: minimumTrackTintColor 
        }]} />
        <View style={[styles.customSliderTrackEmpty, { 
          backgroundColor: maximumTrackTintColor 
        }]} />
        <View style={[
          styles.customSliderThumb, 
          { 
            left: `${thumbPosition}%`,
            backgroundColor: thumbTintColor,
            marginLeft: -12
          }
        ]} />
      </TouchableOpacity>
    </View>
  );
};

// Progress Step Component
const ProgressStep = ({ step, title, icon: Icon, isActive, isCompleted }) => (
  <View style={styles.progressStep}>
    <View style={[
      styles.progressCircle,
      isActive && styles.activeProgressCircle,
      isCompleted && styles.completedProgressCircle
    ]}>
      {isCompleted ? (
        <CheckCircle2 color="#FFFFFF" size={18} />
      ) : (
        <Icon 
          color={isActive ? "#FFFFFF" : "#9CA3AF"} 
          size={18} 
        />
      )}
    </View>
    <Text style={[
      styles.progressTitle,
      isActive && styles.activeProgressTitle
    ]}>
      {title}
    </Text>
  </View>
);

// Custom Dropdown Component
const CustomDropdown = ({ label, value, options, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    onSelect(option);
    toggleDropdown();
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <TouchableOpacity style={[
        styles.dropdownButton,
        isOpen && styles.dropdownButtonOpen
      ]} onPress={toggleDropdown}>
        <View style={styles.dropdownButtonContent}>
          {selectedOption && (
            <Text style={styles.optionEmoji}>{selectedOption.icon}</Text>
          )}
          <Text style={[
            styles.dropdownButtonText,
            selectedOption && { color: selectedOption.color }
          ]}>
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
        </View>
        <View style={[
          styles.chevronContainer,
          isOpen && styles.chevronRotated
        ]}>
          <ChevronDown color="#6B7280" size={18} />
        </View>
      </TouchableOpacity>
      
      {isOpen && (
        <View style={styles.dropdownList}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dropdownOption,
                index === options.length - 1 && styles.lastDropdownOption
              ]}
              onPress={() => selectOption(option)}
            >
              <Text style={styles.optionEmoji}>{option.icon}</Text>
              <View style={[styles.optionIndicator, { backgroundColor: option.color }]} />
              <Text style={styles.dropdownOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Course Card Component
const CourseCard = ({ courseIndex, course, updateCourse }) => {
  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  const getDifficultyColor = () => {
    const difficulty = DIFFICULTY_OPTIONS.find(opt => opt.value === course.difficulty);
    return difficulty ? difficulty.color : "#9CA3AF";
  };

  const getPriorityColor = () => {
    const priority = PRIORITY_OPTIONS.find(opt => opt.value === course.priority);
    return priority ? priority.color : "#9CA3AF";
  };

  return (
    <View style={styles.courseCard}>
      <View style={styles.courseCardHeader}>
        <View style={[styles.courseNumberContainer, { backgroundColor: getDifficultyColor() }]}>
          <Text style={styles.courseNumber}>{courseIndex + 1}</Text>
        </View>
        <View style={styles.courseHeaderText}>
          <Text style={styles.courseCardTitle}>Course {courseIndex + 1}</Text>
          <Text style={styles.courseCardSubtitle}>Fill in the details below</Text>
        </View>
        <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor() }]} />
      </View>

      {/* Course Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          <BookOpen size={16} color="#088a6a" /> Course Name
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g. Advanced Mathematics"
          placeholderTextColor="#9CA3AF"
          value={course.name}
          onChangeText={(text) => updateCourse(courseIndex, 'name', text)}
        />
      </View>

      {/* Difficulty and Priority Row */}
      <View style={styles.dropdownRow}>
        <View style={styles.halfWidth}>
          <CustomDropdown
            label="Difficulty Level"
            value={course.difficulty}
            options={DIFFICULTY_OPTIONS}
            onSelect={(option) => updateCourse(courseIndex, 'difficulty', option.value)}
            placeholder="Select difficulty"
          />
        </View>
        <View style={styles.halfWidth}>
          <CustomDropdown
            label="Priority"
            value={course.priority}
            options={PRIORITY_OPTIONS}
            onSelect={(option) => updateCourse(courseIndex, 'priority', option.value)}
            placeholder="Select priority"
          />
        </View>
      </View>

      {/* Duration Slider */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>
          <Clock size={16} color="#088a6a" /> Study Duration: {formatDuration(course.duration)}
        </Text>
        <View style={styles.sliderWrapper}>
          <CustomSlider
            style={styles.slider}
            minimumValue={30}
            maximumValue={180}
            step={15}
            value={course.duration}
            onValueChange={(value) => updateCourse(courseIndex, 'duration', value)}
            minimumTrackTintColor="#10B981"
            maximumTrackTintColor="#E5E7EB"
            thumbTintColor="#10B981"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabelText}>30m</Text>
            <Text style={styles.sliderLabelText}>60m</Text>
            <Text style={styles.sliderLabelText}>90m</Text>
            <Text style={styles.sliderLabelText}>120m</Text>
            <Text style={styles.sliderLabelText}>150m</Text>
            <Text style={styles.sliderLabelText}>180m</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const AddCoursesScreen = ({ navigation }) => {
  const [numberOfCourses, setNumberOfCourses] = useState(1);
  const [courses, setCourses] = useState([]);

  // Generate random circles for decoration
  const decorativeCircles = [
    { size: 180, top: 120, right: -60, opacity: 0.05, color: '#088a6a' },
    { size: 220, top: height * 0.4, left: -100, opacity: 0.04, color: '#F59E0B' },
    { size: 150, bottom: 100, right: -50, opacity: 0.06, color: '#088a6a' },
    { size: 100, top: height * 0.7, left: 30, opacity: 0.03, color: '#10B981' },
    { size: 80, bottom: 200, right: 40, opacity: 0.04, color: '#088a6a' },
  ];

  useEffect(() => {
    // Initialize courses array
    const initialCourses = Array.from({ length: numberOfCourses }, () => ({
      name: '',
      difficulty: '',
      priority: '',
      duration: 90,
    }));
    setCourses(initialCourses);
  }, []);

  useEffect(() => {
    // Update courses array when number changes
    const newCourses = Array.from({ length: numberOfCourses }, (_, index) => 
      courses[index] || {
        name: '',
        difficulty: '',
        priority: '',
        duration: 90,
      }
    );
    setCourses(newCourses);
  }, [numberOfCourses]);

  const updateCourse = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index] = { ...updatedCourses[index], [field]: value };
    setCourses(updatedCourses);
  };

  const validateAndProceed = () => {
    const incompleteCourses = courses.filter(course => 
      !course.name.trim() || !course.difficulty || !course.priority
    );

    if (incompleteCourses.length > 0) {
      Alert.alert(
        '📚 Incomplete Information',
        'Please fill in all course details before proceeding to create your perfect study schedule!',
        [{ text: 'Got it!' }]
      );
      return;
    }

    // Save courses and navigate to next screen
    console.log('Courses to save:', courses);
    Alert.alert(
      '🎉 Great Job!',
      `You've added ${courses.length} courses. Ready to set your study times?`,
      [{ text: 'Next', onPress: () => { navigation.navigate('NumberOfCourses', { courses });} }]
    );
  };

  const progressSteps = [
    { title: 'Add Courses', icon: BookOpen, isActive: true, isCompleted: false },
    { title: 'Set Times', icon: Clock, isActive: false, isCompleted: false },
    { title: 'Preferences', icon: Settings, isActive: false, isCompleted: false },
    { title: 'Schedule', icon: Calendar, isActive: false, isCompleted: false },
  ];

  const getCompletionPercentage = () => {
    const completedCourses = courses.filter(course => 
      course.name.trim() && course.difficulty && course.priority
    ).length;
    return Math.round((completedCourses / courses.length) * 100);
  };

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
            position: 'absolute',
            top: circle.top,
            left: circle.left,
            right: circle.right,
            bottom: circle.bottom,
            zIndex: 1,
          }}
        />
      ))}
      
      {/* Header - No background */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Add Your Courses</Text>
          <Text style={styles.headerSubtitle}>Step 1 of 4</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.completionBadge}>
            <Text style={styles.completionText}>{getCompletionPercentage()}%</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Indicator - Moved inside ScrollView */}
        <View style={styles.progressContainer}>
          <View style={styles.progressSteps}>
            {progressSteps.map((step, index) => (
              <React.Fragment key={index}>
                <ProgressStep {...step} />
                {index < progressSteps.length - 1 && (
                  <View style={styles.progressLine} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
        
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeHeader}>
            <GraduationCap color="#088a6a" size={32} />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>Let's Build Your Study Plan! 🎯</Text>
              <Text style={styles.welcomeSubtitle}>
                Add your courses with their difficulty levels, study duration, and priority to create a personalized schedule.
              </Text>
            </View>
          </View>
        </View>

        {/* Number of Courses Slider */}
        <View style={styles.courseCountContainer}>
          <View style={styles.courseCountHeader}>
            <Target color="#088a6a" size={20} />
            <Text style={styles.courseCountTitle}>Number of Courses: {numberOfCourses}</Text>
          </View>
          <Text style={styles.courseCountSubtitle}>
            How many courses are you taking this semester?
          </Text>
          <View style={styles.courseCountSliderWrapper}>
            <CustomSlider
              style={styles.courseCountSlider}
              minimumValue={1}
              maximumValue={12}
              step={1}
              value={numberOfCourses}
              onValueChange={setNumberOfCourses}
              minimumTrackTintColor="#088a6a"
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor="#088a6a"
            />
            <View style={styles.courseCountLabels}>
              <Text style={styles.courseCountLabelText}>1 course</Text>
              <Text style={styles.courseCountLabelText}>6 courses</Text>
              <Text style={styles.courseCountLabelText}>12 courses</Text>
            </View>
          </View>
        </View>

        {/* Course Cards */}
        <View style={styles.coursesContainer}>
          <View style={styles.coursesHeader}>
            <Text style={styles.coursesTitle}>Your Courses ({courses.length})</Text>
            <Text style={styles.coursesSubtitle}>Fill in the details for each course</Text>
          </View>
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              courseIndex={index}
              course={course}
              updateCourse={updateCourse}
            />
          ))}
        </View>

        {/* Tips Card */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Zap color="#F59E0B" size={20} />
            <Text style={styles.tipsTitle}>Pro Tips 💡</Text>
          </View>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Set realistic study durations based on course difficulty</Text>
            <Text style={styles.tipItem}>• Prioritize courses with upcoming exams or assignments</Text>
            <Text style={styles.tipItem}>• Consider your energy levels when scheduling study times</Text>
          </View>
        </View>
        
        {/* Extra space at bottom for button */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Navigation - Closer to bottom */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            getCompletionPercentage() === 100 && styles.nextButtonActive
          ]}
          onPress={validateAndProceed}
          activeOpacity={0.8}
        >
          <View style={styles.nextButtonContent}>
            <Text style={styles.nextButtonText}>
              {getCompletionPercentage() === 100 ? 'Continue to Next Step' : 'Complete All Courses'}
            </Text>
            <TrendingUp color="#FFFFFF" size={20} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Decorative Circle
  decorativeCircle: {
    position: 'absolute',
    zIndex: 1,
  },
  
  // Custom Slider Styles
  customSliderContainer: {
    height: 40,
    justifyContent: 'center',
  },
  customSliderTrack: {
    height: 6,
    borderRadius: 3,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  customSliderTrackFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: 3,
  },
  customSliderTrackEmpty: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    borderRadius: 3,
    width: '100%',
  },
  customSliderThumb: {
    position: 'absolute',
    top: -9,
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  
  // Header Styles - No background
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 70 : 40,
    paddingBottom: 20,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  headerRight: {
    width: 'auto', // Allow badge to be wider
  },
  completionBadge: {
    backgroundColor: '#088a6a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  completionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    whiteSpace: 'nowrap',
  },

  // Progress Indicator - Now in ScrollView
  progressContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 20,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  progressSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  progressCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  activeProgressCircle: {
    backgroundColor: '#088a6a',
    borderColor: '#088a6a',
  },
  completedProgressCircle: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  progressTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
  },
  activeProgressTitle: {
    color: '#088a6a',
  },
  progressLine: {
    height: 2,
    backgroundColor: '#E5E7EB',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    zIndex: 10,
  },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  // Course Count Slider
  courseCountContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    zIndex: 10,
  },
  courseCountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  courseCountTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  courseCountSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  courseCountSliderWrapper: {
    paddingHorizontal: 4,
  },
  courseCountSlider: {
    width: '100%',
    height: 40,
  },
  courseCountLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  courseCountLabelText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },

  // Courses Section
  coursesContainer: {
    paddingHorizontal: 20,
    zIndex: 10,
  },
  coursesHeader: {
    marginBottom: 16,
  },
  coursesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  coursesSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },

  // Course Cards
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18, // Reduced from 24
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    zIndex: 10,
  },
  courseCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16, // Reduced from 20
    gap: 12,
  },
  courseNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  courseHeaderText: {
    flex: 1,
  },
  courseCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  courseCardSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Input Styles
  inputContainer: {
    marginBottom: 16, // Reduced from 20
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FEFEFE',
    fontWeight: '500',
  },

  // Dropdown Styles
  dropdownRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  halfWidth: {
    flex: 1,
    minWidth: 0, // Allow proper shrinking
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 1000,
    width: '100%', // Ensure full width
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  dropdownButton: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14, // Slightly reduced vertical padding
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FEFEFE',
    minHeight: 52, // Slightly reduced height
    width: '100%', // Ensure full width
  },
  dropdownButtonOpen: {
    borderColor: '#088a6a',
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6, // Reduced gap
    flex: 1,
    minWidth: 0, // Allow proper text wrapping
  },
  dropdownButtonText: {
    fontSize: 15, // Slightly smaller font
    color: '#111827',
    fontWeight: '500',
    flex: 1,
    numberOfLines: 1,
    ellipsizeMode: 'tail',
  },
  chevronContainer: {
    transform: [{ rotate: '0deg' }],
    marginLeft: 6, // Reduced margin
    flexShrink: 0, // Prevent chevron from shrinking
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 1000,
    marginTop: 4,
    width: '100%', // Ensure full width
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12, // Slightly reduced padding
    gap: 10, // Reduced gap
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    minHeight: 48, // Ensure consistent height
  },
  lastDropdownOption: {
    borderBottomWidth: 0,
  },
  optionEmoji: {
    fontSize: 16,
    width: 20, // Fixed width for alignment
    textAlign: 'center',
  },
  optionIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0, // Prevent indicator from shrinking
  },
  dropdownOptionText: {
    fontSize: 15, // Slightly smaller font
    color: '#111827',
    fontWeight: '500',
    flex: 1,
    marginLeft: 4, // Small margin for better spacing
  },

  // Slider Styles
  sliderContainer: {
    marginBottom: 10,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderWrapper: {
    paddingHorizontal: 4,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  sliderLabelText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },

  // Tips Card
  tipsCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 10,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  // Bottom Navigation - Closer to bottom
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    zIndex: 20,
  },
  nextButton: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#9CA3AF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonActive: {
    backgroundColor: '#088a6a',
  },
  nextButtonContent: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default AddCoursesScreen;