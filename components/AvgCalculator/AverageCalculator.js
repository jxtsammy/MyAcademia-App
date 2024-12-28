import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const AverageScorePredictor = ({navigation}) => {
  const [currentCWA, setCurrentCWA] = useState('');
  const [targetedCWA, setTargetedCWA] = useState('');
  const [newCreditHours, setNewCreditHours] = useState('');
  const [completedCreditHours, setCompletedCreditHours] = useState('');
  const [calculatedCWA, setCalculatedCWA] = useState(0);

  const handleCalculate = () => {
    const currentCWAValue = parseFloat(currentCWA);
    const targetedCWAValue = parseFloat(targetedCWA);
    const newCreditHoursValue = parseFloat(newCreditHours);
    const completedCreditHoursValue = parseFloat(completedCreditHours);

    if (
      isNaN(currentCWAValue) ||
      isNaN(targetedCWAValue) ||
      isNaN(newCreditHoursValue) ||
      isNaN(completedCreditHoursValue) ||
      newCreditHoursValue === 0
    ) {
      alert('Please enter valid numbers for all fields and ensure new credit hours is not zero.');
      return;
    }

    const totalCreditHours = newCreditHoursValue + completedCreditHoursValue;
    const result =
      ((targetedCWAValue * totalCreditHours) - (currentCWAValue * completedCreditHoursValue)) / newCreditHoursValue;

    setCalculatedCWA(result);
  };

  return (
    <ImageBackground
      source={require('../../assets/17209.jpg')} // Replace with your image path
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.navText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.header}>CWA Calculator</Text>
        </View>

        <View style={styles.scoreContainer}>
          <View style={styles.Background}>
            <Text style={styles.scoreText}>Average Score</Text>
            <Text style={styles.percentage}>{calculatedCWA.toFixed(2)}%</Text>
          </View>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Current CWA:</Text>
          <TextInput
            style={styles.input}
            value={currentCWA}
            onChangeText={setCurrentCWA}
            placeholder="Enter your current CWA"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Targeted CWA:</Text>
          <TextInput
            style={styles.input}
            value={targetedCWA}
            onChangeText={setTargetedCWA}
            placeholder="Enter your targeted CWA"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Current Credit Hours:</Text>
          <TextInput
            style={styles.input}
            value={newCreditHours}
            onChangeText={setNewCreditHours}
            placeholder="Enter new credit hours"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Total Credit Hours:</Text>
          <TextInput
            style={styles.input}
            value={completedCreditHours}
            onChangeText={setCompletedCreditHours}
            placeholder="Enter completed credit hours"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCalculate}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </View>
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
    padding: 20,
    backgroundColor: 'transparent',
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
    color: '#555',
    flex: 0.6,
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