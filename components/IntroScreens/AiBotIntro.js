import React from 'react';
import {SafeAreaView,  View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';

const AiBotIntro = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../assets/AiBotIntro.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>AI Chatbot</Text>
        <Text style={styles.subtitle}>
          Our app also features an AI ChatBot that is ready to answer every question you've got on your mind
        </Text>
        <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('WelcomeScreen')}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    bottom:60,
  },
  illustrationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  illustration: {
    width: 2000,
    height: 310,
    top: 60
  },
  getStartedButton: {
    width: '100%',
    backgroundColor: '#01796f',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default AiBotIntro;