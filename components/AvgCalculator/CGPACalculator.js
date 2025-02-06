import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

const AverageScorePredictor = () => {
  const [currentCGPA, setCurrentCGPA] = useState('');
  const [targetedCGPA, setTargetedCGPA] = useState('');
  const [newCreditHours, setNewCreditHours] = useState('');
  const [completedCreditHours, setCompletedCreditHours] = useState('');
  const [calculatedCGPA, setCalculatedCGPA] = useState(0);

  const handleCalculate = () => {
    const currentCGPAValue = parseFloat(currentCGPA);
    const targetedCGPAValue = parseFloat(targetedCGPA);
    const newCreditHoursValue = parseFloat(newCreditHours);
    const completedCreditHoursValue = parseFloat(completedCreditHours);

    // Input validation
    if (
      isNaN(currentCGPAValue) ||
      isNaN(targetedCGPAValue) ||
      isNaN(newCreditHoursValue) ||
      isNaN(completedCreditHoursValue) ||
      newCreditHoursValue <= 0 ||
      completedCreditHoursValue < 0 ||
      currentCGPAValue < 0 ||
      targetedCGPAValue < 0
    ) {
      alert('Please enter valid positive numbers for all fields and ensure new credit hours is greater than zero.');
      return;
    }

    // Edge case: If no credits are completed
    if (completedCreditHoursValue === 0) {
      setCalculatedCGPA(targetedCGPAValue);
      return;
    }

    // Calculate required CGPA
    const totalCreditHours = newCreditHoursValue + completedCreditHoursValue;
    const result =
      ((targetedCGPAValue * totalCreditHours) - (currentCGPAValue * completedCreditHoursValue)) / newCreditHoursValue;

    setCalculatedCGPA(result);
  };

  return (
    <ImageBackground
      source={require('../../assets/calc.jpg')} // Replace with your image path
      style={styles.imageBackground}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.nav}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.navText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.header}>CGPA Calculator</Text>
          </View>

          <View style={styles.scoreContainer}>
            <View style={styles.Background}>
              <Text style={styles.scoreText}>Cumulative Score</Text>
              <Text style={styles.percentage}>{calculatedCGPA.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Current CGPA:</Text>
            <TextInput
              style={styles.input}
              value={currentCGPA}
              onChangeText={setCurrentCGPA}
              placeholder="Enter your current CGPA"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Targeted CGPA:</Text>
            <TextInput
              style={styles.input}
              value={targetedCGPA}
              onChangeText={setTargetedCGPA}
              placeholder="Enter your targeted CGPA"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Total Current Credits:</Text>
            <TextInput
              style={styles.input}
              value={newCreditHours}
              onChangeText={setNewCreditHours}
              placeholder="Enter new credit hours"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Total Completed Hours:</Text>
            <TextInput
              style={styles.input}
              value={completedCreditHours}
              onChangeText={setCompletedCreditHours}
              placeholder="Enter completed credit hours"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCalculate}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  nav: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: '600',
    color: '#fff',
  },
  navText: {
    fontSize: 30,
    fontWeight: '600',
    marginRight: 10,
    color: '#fff',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  Background: {
    width: '100%',
    backgroundColor: '#01796F',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  scoreText: {
    color: '#fff',
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Trebuchet MS',
  },
  percentage: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Trebuchet MS',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    flex: 0.6,
    fontWeight: 'bold',
  },
  input: {
    flex: 0.3,
    borderWidth: 1,
    borderColor: '#01796F',
    borderRadius: 15,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#01796F',
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AverageScorePredictor;