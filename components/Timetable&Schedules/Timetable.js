import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../CustomNavigations/CustomDawer'
import Tasks from '../TaskPlanner/Tasks'
import CWACalculator from '../AvgCalculator/AverageCalculator'
import AiChat from '../AiChat/ChatScreen'
import EditProfile from '../ProfileSettings/EditProfile'
import Home from '../Home/Home'


const Drawer = createDrawerNavigator();

const TimetableScreen = ({ navigation }) => {
  const today = moment();
  const [selectedDate, setSelectedDate] = useState(today.format('D'));
  const [selectedDay, setSelectedDay] = useState(today.format('ddd'));
  const [selectedMonth, setSelectedMonth] = useState(today.format('MMM YYYY'));
  const [dates, setDates] = useState([]);
  const [schedules, setSchedules] = useState([
    {
      id: '1',
      time: '10:00 AM - 12:00 PM',
      subject: 'Mathematics',
      location: 'Room 101',
      date: '17',
      month: 'Oct 2024',
    },
    {
      id: '2',
      time: '1:00 PM - 3:00 PM',
      subject: 'Physics',
      location: 'Room 102',
      date: '17',
      month: 'Oct 2024',
    },
    {
      id: '3',
      time: '4:00 PM - 6:00 PM',
      subject: 'Chemistry',
      location: 'Room 103',
      date: '18',
      month: 'Oct 2024',
    },
    {
      id: '4',
      time: '9:00 AM - 11:00 AM',
      subject: 'Biology',
      location: 'Room 104',
      date: '18',
      month: 'Nov 2024',
    },
    {
      id: '5',
      time: '9:00 AM - 11:00 AM',
      subject: 'Chemistry',
      location: 'Room 104',
      date: '18',
      month: 'Dec 2024',
    },
  ]);

  const flatListRef = useRef(null);

  useEffect(() => {
    const daysInMonth = moment(selectedMonth, 'MMM YYYY').daysInMonth();
    const newDates = Array.from({ length: daysInMonth }, (_, i) => {
      const date = moment(selectedMonth, 'MMM YYYY').date(i + 1);
      return {
        day: date.format('ddd'),
        date: date.format('D'),
      };
    });
    setDates(newDates);

    const isCurrentMonth = moment(selectedMonth, 'MMM YYYY').isSame(today, 'month');
    if (isCurrentMonth) {
      setSelectedDate(today.format('D'));
      setSelectedDay(today.format('ddd'));

      const todayIndex = newDates.findIndex((item) => item.date === today.format('D'));
      if (todayIndex !== -1) {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({ index: todayIndex, animated: true });
        }, 500);
      }
    } else {
      setSelectedDate(null);
      setSelectedDay(null);
    }
  }, [selectedMonth,]);

  const handleDateChange = (day, date) => {
    setSelectedDate(date);
    setSelectedDay(day);
  };

  const handlePreviousMonth = () => {
    const previousMonth = moment(selectedMonth, 'MMM YYYY').subtract(1, 'month');
    setSelectedMonth(previousMonth.format('MMM YYYY'));
  };

  const handleNextMonth = () => {
    const nextMonth = moment(selectedMonth, 'MMM YYYY').add(1, 'month');
    setSelectedMonth(nextMonth.format('MMM YYYY'));
  };

  const handleDeleteSchedule = (id) => {
    setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule.id !== id));
  };

  const filteredSchedules = schedules.filter(
    (schedule) => schedule.date === selectedDate && schedule.month === selectedMonth
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.navText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Timetable</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={24} color="#fff" style={styles.menuIcon}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.calendarContainer}>
          <TouchableOpacity onPress={handlePreviousMonth}>
            <Ionicons name="chevron-back-outline" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.monthText}>{selectedMonth}</Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Ionicons name="chevron-forward-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <FlatList
          ref={(ref) => (flatListRef.current = ref)}
          data={dates}
          keyExtractor={(item) => item.date}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateSelector}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.dateContainer,
                selectedDate === item.date && styles.selectedDateContainer,
              ]}
              onPress={() => handleDateChange(item.day, item.date)}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate === item.date && styles.selectedDateText,
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dateNumber,
                  selectedDate === item.date && styles.selectedDateText,
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          )}
        />

        <ScrollView style={styles.contentContainer}>
          {selectedDay && selectedDate ? (
            <>
              <Text style={styles.dayTitle}>{`${selectedDay} ${selectedDate}`}</Text>
              {filteredSchedules.length > 0 ? (
                filteredSchedules.map((schedule) => (
                  <View key={schedule.id} style={styles.scheduleContainer}>
                    <View style={styles.scheduleDetails}>
                      <Text style={styles.scheduleText}>Time: {schedule.time}</Text>
                      <Text style={styles.scheduleText}>Subject: {schedule.subject}</Text>
                      <Text style={styles.scheduleText}>Location: {schedule.location}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteSchedule(schedule.id)}>
                      <Ionicons name="trash-bin" size={24} color="#fff" style={styles.trashIcon} />
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={styles.noClassText}>No Schedules today.</Text>
              )}
            </>
          ) : (
            <Text style={styles.noClassText}>Select a date for schedule details.</Text>
          )}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.plusIcon}  onPress={() => navigation.navigate('TimetableForm')}>
        <Ionicons name="add" size={30} color="#01796F" fontWeight="bold" />
      </TouchableOpacity>
    </SafeAreaView>
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
      <Drawer.Screen name="TimetableScreen" component={TimetableScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Drawer.Screen name="Tasks" component={Tasks} options={{ headerShown: false }}/>
        <Drawer.Screen name="CWACalculator" component={CWACalculator} options={{ headerShown: false }}/>
        <Drawer.Screen name="AiChat" component={AiChat} options={{ headerShown: false }}/>
        <Drawer.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
      </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#01796F',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginBottom: 20,
  },
  navText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    left: 10
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginLeft: 15,
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  dateSelector: {
    paddingVertical: 5,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 5,
  },
  selectedDateContainer: {
    backgroundColor: '#01796F',
  },
  dateText: {
    color: '#333',
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDateText: {
    color: '#fff',
  },
  contentContainer: {
    bborderRadius: 10,
    height: '70%',
    marginTop: 30,
  },
  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#01796F',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  scheduleDetails: {
    flex: 1,
  },
  scheduleText: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 2,
  },
  trashIcon: {
    marginLeft: 10,
  },
  dayTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noClassText: {
    fontSize: 24,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 150,
  },
  plusIcon: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});

export default App;