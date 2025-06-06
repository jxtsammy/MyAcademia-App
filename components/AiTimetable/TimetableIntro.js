import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Calendar,
  BookOpen,
  Clock,
  Brain,
  Bell,
  Sparkles,
  Target,
  Zap,
  CheckCircle2,
  Plus,
  ChevronRight,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// Enhanced color palette
const COLORS = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  accent: '#06B6D4',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  background: '#fff',
  surface: '#FFFFFF',
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    light: '#9CA3AF'
  },
  gradients: {
    primary: ['#6366F1', '#8B5CF6'],
    success: ['#10B981', '#059669'],
    warning: ['#F59E0B', '#D97706'],
    accent: ['#06B6D4', '#0891B2'],
    sunset: ['#F97316', '#EA580C'],
    ocean: ['#0EA5E9', '#0284C7'],
    pink: ['#EC4899', '#BE185D'],
    purple: ['#A855F7', '#7C3AED'],
  }
};

// Step Card Component
const StepCard = ({ step, title, description, icon: Icon, gradient, delay }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 600,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        delay: delay,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={[
        styles.stepCard,
        {
          opacity,
          transform: [{ translateY }, { scale: scaleValue }],
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.8}>
        <LinearGradient
          colors={gradient}
          style={styles.stepCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.stepCardContent}>
            <View style={styles.stepHeader}>
              <View style={styles.stepIconContainer}>
                <Icon color="#FFFFFF" size={20} />
              </View>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{step}</Text>
              </View>
            </View>
            <Text style={styles.stepTitle}>{title}</Text>
            <Text style={styles.stepDescription}>{description}</Text>
            <View style={styles.stepArrow}>
              <ChevronRight color="rgba(255,255,255,0.7)" size={16} />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Feature Badge Component
const FeatureBadge = ({ icon: Icon, text, delay }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      delay: delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.featureBadge,
        {
          opacity: animatedValue,
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        },
      ]}
    >
      <Icon color={COLORS.primary} size={16} />
      <Text style={styles.featureBadgeText}>{text}</Text>
    </Animated.View>
  );
};

const StudyPlannerScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const headerAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(headerAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const steps = [
    {
      step: '01',
      title: 'Add Your Courses',
      description: 'Input your subjects with difficulty levels and credit hours',
      icon: BookOpen,
      gradient: COLORS.gradients.success,
    },
    {
      step: '02',
      title: 'Set Study Times',
      description: 'Define your available study hours and preferences',
      icon: Clock,
      gradient: COLORS.gradients.pink,
    },
    {
      step: '03',
      title: 'AI Optimization',
      description: 'Get an intelligent study schedule tailored for you',
      icon: Brain,
      gradient: COLORS.gradients.warning,
    },
    {
      step: '04',
      title: 'Smart Reminders',
      description: 'Receive personalized notifications and track progress',
      icon: Bell,
      gradient: COLORS.gradients.accent,
    },
  ];

  const features = [
    { icon: Sparkles, text: 'AI-Powered', delay: 100 },
    { icon: Target, text: 'Goal-Oriented', delay: 200 },
    { icon: Zap, text: 'Quick Setup', delay: 300 },
  ];

  const handleCreateTimetable = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('AddCourses')
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color={COLORS.text.primary} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Study Planner</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View
          style={[
            styles.heroSection,
            {
              opacity: headerAnimation,
              transform: [
                {
                  translateY: headerAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.heroIconContainer}>
            <LinearGradient
              colors={COLORS.gradients.primary}
              style={styles.heroIcon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Calendar color="#FFFFFF" size={32} />
            </LinearGradient>
          </View>
          
          <Text style={styles.heroTitle}>5-Day Study Planner</Text>
          <Text style={styles.heroSubtitle}>
            Create your perfect study schedule in minutes with our AI-powered timetable generator
          </Text>

          {/* Feature Badges */}
          <View style={styles.featureContainer}>
            {features.map((feature, index) => (
              <FeatureBadge
                key={index}
                icon={feature.icon}
                text={feature.text}
                delay={feature.delay}
              />
            ))}
          </View>
        </Animated.View>

        {/* Create Button */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonAnimation,
              transform: [
                {
                  scale: buttonAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateTimetable}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <LinearGradient
              colors={COLORS.gradients.success}
              style={styles.createButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.createButtonContent}>
                {isLoading ? (
                  <Animated.View style={styles.loadingContainer}>
                    <Text style={styles.createButtonText}>Setting Up...</Text>
                  </Animated.View>
                ) : (
                  <>
                    <Plus color="#FFFFFF" size={20} />
                    <Text style={styles.createButtonText}>Create New Timetable</Text>
                  </>
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* How it Works Section */}
        <View style={styles.howItWorksSection}>
          <Text style={styles.sectionTitle}>How it works</Text>
          <Text style={styles.sectionSubtitle}>
            Follow these simple steps to create your personalized study schedule
          </Text>
          
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <StepCard
                key={index}
                {...step}
                delay={index * 150}
              />
            ))}
          </View>
        </View>

        {/* Bottom CTA */}
        <View style={styles.bottomCTA}>
          <LinearGradient
            colors={['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)']}
            style={styles.ctaGradient}
          >
            <CheckCircle2 color={COLORS.primary} size={24} />
            <Text style={styles.ctaTitle}>Ready to boost your productivity?</Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands of students who improved their study habits
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 70 : 10,
    paddingBottom: 5,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  headerSpacer: {
    width: 44,
  },

  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  heroIconContainer: {
    marginBottom: 24,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },

  // Feature Badges
  featureContainer: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },

  // Create Button
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  createButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  createButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  createButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  // How it Works Section
  howItWorksSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  stepsContainer: {
    gap: 12,
  },

  // Step Cards
  stepCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  stepCardGradient: {
    padding: 16,
    minHeight: 80,
  },
  stepCardContent: {
    position: 'relative',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stepIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 16,
    paddingRight: 20,
  },
  stepArrow: {
    position: 'absolute',
    right: 0,
    top: '50%',
    marginTop: -10,
  },

  // Bottom CTA
  bottomCTA: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  ctaGradient: {
    padding: 32,
    alignItems: 'center',
    gap: 12,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default StudyPlannerScreen;