import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimetableForm = ({navigation}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [subject, setSubject] = useState('');
  const [location, setLocation] = useState('');
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [selectedDays, setSelectedDays] = useState(new Array(7).fill(false));

  const toggleDaySelection = (index) => {
    setSelectedDays((prev) => {
      const newDays = [...prev];
      newDays[index] = !newDays[index];
      return newDays;
    });
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowStartPicker(false);
      setShowEndPicker(false);
      setShowTimePicker(false);
      return;
    }

    if (selectedDate) {
      if (showStartPicker) {
        setStartDate(selectedDate);
      } else if (showEndPicker) {
        setEndDate(selectedDate);
      } else if (showTimePicker) {
        setTime(selectedDate);
      }
    }
    setShowStartPicker(false);
    setShowEndPicker(false);
    setShowTimePicker(false);
  };

  // Function to handle saving the schedule
  const handleSave = () => {
    // Save the schedule (you can implement your saving logic here)
    console.log('Schedule Saved:', {
      startDate,
      endDate,
      time,
      subject,
      location,
      selectedDays,
    });

    // Clear the form
    setStartDate(new Date());
    setEndDate(new Date());
    setTime(new Date());
    setSubject('');
    setLocation('');
    setSelectedDays(new Array(7).fill(false));
  };

  // Function to handle cancellation
  const handleCancel = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.nav}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.navText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Add Schedules</Text>
        </View>
        {/* Days of the Week */}
        <Text style={styles.label}>Select Days:</Text>
        <View style={styles.daysContainer}>
          {daysOfWeek.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dayButton, selectedDays[index] ? styles.selectedDay : styles.unselectedDay]}
              onPress={() => toggleDaySelection(index)}
            >
              <Text style={[styles.dayText, selectedDays[index] ? styles.selectedDayText : styles.unselectedDayText]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Start Date */}
        <Text style={styles.label}>Start Date:</Text>
        <TouchableOpacity style={styles.inputField} onPress={() => setShowStartPicker(true)}>
          <Text style={styles.inputText}>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'default' : 'default'}
            onChange={handleDateChange}
            style={styles.dateTimePicker}
          />
        )}

        {/* End Date */}
        <Text style={styles.label}>End Date:</Text>
        <TouchableOpacity style={styles.inputField} onPress={() => setShowEndPicker(true)}>
          <Text style={styles.inputText}>{endDate.toDateString()}</Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'default' : 'default'}
            onChange={handleDateChange}
            style={styles.dateTimePicker}
          />
        )}

        {/* Time */}
        <Text style={styles.label}>Time:</Text>
        <TouchableOpacity style={styles.inputField} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.inputText}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display={Platform.OS === 'ios' ? 'default' : 'default'}
            onChange={handleDateChange}
            style={styles.dateTimePicker}
          />
        )}

        {/* Subject and Location Inputs with Keyboard Avoiding View */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {/* Subject Input */}
          <Text style={styles.label}>Subject:</Text>
          <TextInput
            style={styles.inputField}
            value={subject}
            onChangeText={setSubject}
            placeholder="Enter subject"
          />

          {/* Location Input */}
          <Text style={styles.label}>Location:</Text>
          <TextInput
            style={styles.inputField}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter location"
          />

          {/* Button Container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={[handleSave,navigation.goBack()]}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  nav: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: '600',
  },
  navText: {
    fontSize: 30,
    fontWeight: '600',
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 3,
  },
  inputText: {
    color: '#333',
    fontSize: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dayButton: {
    width: 45,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedDay: {
    backgroundColor: '#01796f',
  },
  unselectedDay: {
    backgroundColor: 'transparent',
  },
  dayText: {
    fontWeight: 'bold',
  },
  selectedDayText: {
    color: '#fff',
    fontSize: 17
  },
  unselectedDayText: {
    color: '#01796f',
    fontSize: 17
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#01796f',
    borderRadius: 25,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  cancelButton: {
    borderRadius: 25,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateTimePicker: {
    width: '100%',
  },
});

export default TimetableForm;