// WelcomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.goBack()}>
            <Text style={styles.navText}>←</Text>
          <Text style={styles.logoText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>
          Welcome to our Cumlative Average Calculator.
        </Text>

        <Text style={styles.subtitle}>
          Whether CGPA or CWA we've got tthe neccessary tool for you
        </Text>

        {/* Bot Illustration */}
        <View style={styles.illustration}>

          {/* Chat Bubbles */}
          <View style={[styles.chatBubble, styles.pinkBubble]} />
          <View style={[styles.chatBubble, styles.purpleBubble]} />
         <Image
            source={require('../../assets/calcuate.png')}
            style={styles.botImage}
          />
        </View>

        {/* Culative Buttons */}
        <TouchableOpacity
          style={styles.button} onPress={() => navigation.navigate('CWACalculator')}
        >
          <Text style={styles.buttonText}>CWA Calculator</Text>
          <View style={styles.arrowContainer}>
            <Text style={styles.buttonArrow}>→</Text>
          </View>
        </TouchableOpacity>

         <TouchableOpacity
          style={styles.cgpaButton} onPress={() => navigation.navigate('CGPACalculator')}
        >
         <View style={styles.cgpaArrowContainer}>
            <Text style={styles.cgpaButtonArrow}>←</Text>
          </View>
          <Text style={styles.cgpaButtonText}>CGPA Calculator</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    zIndex: 999
  },
  navText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#fff',
  },
  logoContainer: {
    backgroundColor: '#01796f',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 5
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  illustration: {
    alignItems: 'center',
    marginVertical: 40,
  },
  botImage: {
    width: 350,
    height: 250,
    bottom: 40
  },
  chatBubble: {
    width: 100,
    height: 100,
    borderRadius: 60,
    position: 'absolute',
  },
  pinkBubble: {
    backgroundColor: '#FFE1E6',
    left: -80,
    bottom: 550
  },
  purpleBubble: {
    backgroundColor: '#01796f',
    right: -80,
    bottom: 300
  },
  button: {
    backgroundColor: '#01796f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 60,
    marginTop: 'auto',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  arrowContainer: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    left: 20
  },
  buttonArrow: {
    color: '#01796f',
    fontSize: 32,
  },
  cgpaButton: {
    backgroundColor: '#ffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#01796f'
  },
  cgpaButtonText: {
    color: '#01796f',
    fontSize: 20,
    fontWeight: '600',
  },
  cgpaArrowContainer: {
    backgroundColor: '#01796f',
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    right: 20
  },
  cgpaButtonArrow: {
    color: '#ffff',
    fontSize: 32,
  },
});

export default WelcomeScreen;