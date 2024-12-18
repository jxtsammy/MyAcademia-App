import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bell, Menu } from 'lucide-react-native';
import { createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../CustomNavigations/CustomDawer'
import Timetable from '../Timetable&Schedules/Timetable'
import Tasks from '../TaskPlanner/Tasks'
import CWACalculator from '../AvgCalculator/AverageCalculator'
import AiChat from '../AiChat/ChatScreen'
import EditProfile from '../ProfileSettings/EditProfile'

const Drawer = createDrawerNavigator();

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.88;

// Utility function to format date
const formatDate = (date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return {
    dayOfWeek: days[date.getDay()],
    day: date.getDate(),
    month: months[date.getMonth()]
  };
};

// Motivational Images Array
const MOTIVATIONAL_IMAGES = [
  require('../../assets/motivate.jpg'),
  require('../../assets/motivation2.jpg'),
  require('../../assets/motivation3.jpg'),
  require('../../assets/motivation4.jpg'),
  require('../../assets/motivation5.jpg'),
];

// Mock Schedules (replace with actual backend/database)
const CLASS_SCHEDULES = {
  '2024-02-08': {
    title: 'Numerical Analysis',
    time: '12:30 PM',
    location: 'COS 9F11'
  },
  '2024-02-09': {
    title: 'Database Systems',
    time: '10:00 AM',
    location: 'Tech Building 3B'
  },
  // Add more schedules with dates in 'YYYY-MM-DD' format
};

// Task Card Component
const TaskCard = ({ title, tasks, completion, color }) => (
  <TouchableOpacity style={[styles.taskCard, { backgroundColor: color }]}>
    <View style={styles.taskCardContent}>
      <View style={styles.taskCardLeft}>
        <Text style={styles.taskCardTitle}>{title}</Text>
        <Text style={styles.taskCount}>+{tasks} tasks</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${completion}%` }]} />
        </View>
        <Text style={styles.completionText}>{completion}% Completed</Text>
      </View>
      <View style={styles.taskCardRight}>
        <Image
          source={require('../../assets/taskIllustration.png')}
          style={styles.taskIllustration}
        />
      </View>
    </View>
  </TouchableOpacity>
);

const Home = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [currentMotivationalImage, setCurrentMotivationalImage] = useState(null);
  const [todaySchedule, setTodaySchedule] = useState(null);
  const dashboardMoveAnimation = useRef(new Animated.Value(0)).current;

  const taskCards = [
    { title: 'Work', tasks: 3, completion: 60, color: '#00B074' },
    { title: 'Study', tasks: 5, completion: 45, color: '#FFA500' },
    { title: 'Personal', tasks: 2, completion: 80, color: '#4169E1' },
    { title: 'Coding', tasks: 8, completion: 30, color: '#088a6a' }
  ];

  useEffect(() => {
    const updateDynamicContent = async () => {
      const today = new Date().toISOString().split('T')[0];

      // Check and update motivational image
      const lastImageUpdateDate = await AsyncStorage.getItem('lastImageUpdateDate');
      const storedImageIndex = await AsyncStorage.getItem('currentImageIndex');

      if (!lastImageUpdateDate || lastImageUpdateDate !== today) {
        const newImageIndex = storedImageIndex
          ? (parseInt(storedImageIndex) + 1) % MOTIVATIONAL_IMAGES.length
          : 0;

        setCurrentMotivationalImage(MOTIVATIONAL_IMAGES[newImageIndex]);

        await AsyncStorage.setItem('lastImageUpdateDate', today);
        await AsyncStorage.setItem('currentImageIndex', newImageIndex.toString());
      } else if (storedImageIndex) {
        setCurrentMotivationalImage(MOTIVATIONAL_IMAGES[parseInt(storedImageIndex)]);
      }

      // Check and update today's schedule
      const scheduleForToday = CLASS_SCHEDULES[today];
      setTodaySchedule(scheduleForToday);
    };

    updateDynamicContent();
  }, []);

  const toggleImageExpand = () => {
    const toValue = isImageExpanded ? 0 : 1;
    Animated.timing(dashboardMoveAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setIsImageExpanded(!isImageExpanded);
    });
  };

  // Reset dashboard to original position
  const resetDashboardPosition = () => {
    if (isImageExpanded) {
      Animated.timing(dashboardMoveAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        setIsImageExpanded(false);
      });
    }
  };

  // Render Task Content
  const renderTaskContent = () => {
    return (
      <View style={[styles.taskContent, { height: height - 400 }]}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.verticalCardContainer}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        >
          {taskCards.map((card, index) => (
            <TaskCard key={index} {...card} />
          ))}
        </ScrollView>
      </View>
    );
  };

  // Render Timetable Content
  const renderTimetableContent = () => {
    const totalCompletion = taskCards.reduce((acc, card) => acc + card.completion, 0) / taskCards.length;
    const today = new Date();
    const { dayOfWeek, day, month } = formatDate(today);

    return (
      <View style={styles.timetableContent}>
        {/* Next Class Card */}
        <TouchableOpacity style={styles.classCard} onPress={() => navigation.navigate('Timetable')}>
          <View style={styles.classContent}>
            {todaySchedule ? (
              <>
                <Text style={styles.classTitle}>Next Class</Text>
                <Text style={styles.classTime}>{todaySchedule.time}</Text>
                <Text style={styles.classDetails}>Subject: {todaySchedule.title}</Text>
                <Text style={styles.classDetails}>Location: {todaySchedule.location}</Text>
                <View style={styles.calender}>
                  <Image
                    source={require('../../assets/calendarIcon.png')}
                    style={styles.calendarImage}
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.classTitle}>Today</Text>
                <Text style={styles.classTime}>{`${dayOfWeek}, ${day} ${month}`}</Text>
                <Text style={styles.classDetails}>No Schedules for today</Text>
                <View style={styles.calender}>
                  <Image
                    source={require('../../assets/calendarIcon.png')}
                    style={styles.calendarImage}
                  />
                </View>
              </>
            )}
          </View>
        </TouchableOpacity>

        {/* Overall Progress */}
        <View style={styles.overallProgressContainer} >
          <TouchableOpacity onPress={() => navigation.navigate('Tasks')}>
          <View style={styles.overallProgressHeader}>
            <Text style={styles.overallProgressTitle}>Tasks Completed</Text>
            <Text style={styles.overallProgressPercentage}>{Math.round(totalCompletion)}%</Text>
          </View>
          <View style={styles.overallProgressBarContainer}>
            <View style={[styles.overallProgressBar, { width: `${totalCompletion}%` }]} />
          </View>
          </TouchableOpacity>
        </View>

        {/* Tools Container */}
        <View style={styles.toolsContainer}>
          <TouchableOpacity style={styles.tool} onPress={() => navigation.navigate('CWACalculator')}>
            <View style={styles.toolContent}>
              <Image
                source={require('../../assets/calculatoeIcon.png')}
                style={styles.toolIcon}
              />
              <Text style={styles.toolText}>CWA Target Tool</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tool, styles.chatbotTool]} onPress={() => navigation.navigate('AiChat')}>
            <View style={styles.toolContent}>
              <Image
                source={require('../../assets/botIcon.png')}
                style={styles.toolIcon}
              />
              <Text style={styles.toolText}>Ace Chatbot</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.profileContainer}>
            <Image
              source={require('../../assets/okarun.jpg')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Home</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Bell color="#01796f" size={26} style={styles.icon} />
          </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.openDrawer()}>
           <Menu color="#01796f" size={26} style={styles.icon} />
         </TouchableOpacity>
        </View>
      </View>

      {/* Quote Section with Dynamic Image */}
      <TouchableOpacity
        style={styles.quoteContainer}
        onPress={toggleImageExpand}
      >
        {currentMotivationalImage && (
          <Image
            source={currentMotivationalImage}
            style={styles.quoteBackground}
          />
        )}
      </TouchableOpacity>

      {/* Dashboard Container with TouchableWithoutFeedback added */}
      <TouchableWithoutFeedback onPress={resetDashboardPosition}>
        <Animated.View
          style={[
            styles.dashboardContainer,
            {
              transform: [
                {
                  translateY: dashboardMoveAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, height - 690]
                  })
                }
              ]
            }
          ]}
        >
          {/* Dashboard Title */}
          <Text style={styles.dashboardTitle}>Dashboard</Text>

          {/* Tabs */}
          <View style={styles.tabOuterContainer}>
            <View style={styles.tabBackground}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'Overview' && styles.activeTab]}
                onPress={() => setActiveTab('Overview')}
              >
                <Text style={[styles.tabText, activeTab === 'Overview' && styles.activeTabText]}>
                  Overview
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'Task' && styles.activeTab]}
                onPress={() => setActiveTab('Task')}
              >
                <Text style={[styles.tabText, activeTab === 'Task' && styles.activeTabText]}>
                  Task
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Content Area */}
          <View style={styles.content}>
            {activeTab === 'Overview' ? renderTimetableContent() : renderTaskContent()}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const App = () => {
  return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          width:'100%'
        }}
      >
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Drawer.Screen name="Timetable" component={Timetable} options={{ headerShown: false }}/>
        <Drawer.Screen name="Tasks" component={Tasks} options={{ headerShown: false }}/>
        <Drawer.Screen name="CWACalculator" component={CWACalculator} options={{ headerShown: false }}/>
        <Drawer.Screen name="AiChat" component={AiChat} options={{ headerShown: false }}/>
        <Drawer.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
      </Drawer.Navigator>
  );
};


const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  quoteContainer: {
    height: 150,
    justifyContent: 'center',
    position: 'relative',
  },
  quoteBackground: {
    width: "100%",
    height: 350,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    width: '100%',
    top: 290,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  tabOuterContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabBackground: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    padding: 4,
    width: '80%',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 30,
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: 18,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  taskContent: {
    flex: 1,
  },
  verticalCardContainer: {
    flexDirection: 'column',
    gap: 16,
    paddingBottom: 40,
  },
  taskCard: {
    width: CARD_WIDTH,
    borderRadius: 20,
    padding: 20,
    height: 160,
  },
  taskCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  taskCardLeft: {
    flex: 1,
  },
  taskCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12
  },
  taskCount: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  progressContainer: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  completionText: {
    fontSize:14,
    color: '#fff',
  },
  taskCardRight: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  taskIllustration: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  timetableContent: {
    gap: 12,
  },
  classCard: {
    backgroundColor: '#00B074',
    borderRadius: 16,
    padding: 20,
    marginBottom: 5,
  },
  classContent: {
    position: 'relative',
  },
  classTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  classTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  classDetails: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  calender: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
  },
  calendarImage: {
    width: 130,
    height: 110,
    resizeMode: 'contain',
    bottom: 14
  },
  overallProgressContainer: {
    padding: 20,
    backgroundColor: 'crimson',
    borderRadius: 16,
    paddingVertical: 35,
    marginTop: 2,
  },
  overallProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  overallProgressTitle: {
    fontSize: 24,
    fontWeight: 'light',
    color: '#fff',
  },
  overallProgressPercentage: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },
  overallProgressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  overallProgressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  toolsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 5,
    marginBottom: 40
  },
  tool: {
    backgroundColor: '#01796f',
    borderRadius: 16,
    padding: 10,
    flex: 1,
    minWidth: '40%',
  },
  toolContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolIcon: {
    width: 60,
    height: 60,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  chatbotTool: {
    backgroundColor: '#FFA500',
  },
  toolText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;