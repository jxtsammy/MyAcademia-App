// WelcomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

const WelcomeScreen = ({ onGetStarted }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoContainer} /*onPress={() => navigation.goBack()}*/>
            <Text style={styles.navText}>←</Text>
          <Text style={styles.logoText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>
          This AI chatbot does not only anwer your questions but has a fun concept.
        </Text>

        <Text style={styles.subtitle}>
          Beyond Conversation Discover a New Level of Intelligence and Engagement
          ACE
        </Text>

        {/* Bot Illustration */}
        <View style={styles.illustration}>

          {/* Chat Bubbles */}
          <View style={[styles.chatBubble, styles.pinkBubble]} />
          <View style={[styles.chatBubble, styles.purpleBubble]} />
         <Image
            source={require('../../assets/AiIcon.png')}
            style={styles.botImage}
          />
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={[onGetStarted, navigation.navigate('AiChat')]}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <View style={styles.arrowContainer}>
            <Text style={styles.buttonArrow}>→</Text>
          </View>
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
    paddingTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 16,
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
    width: 300,
    height: 350,
    bottom: 90
  },
  chatBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
  },
  pinkBubble: {
    backgroundColor: '#FFE1E6',
    left: -30,
  },
  purpleBubble: {
    backgroundColor: '#01796f',
    right: -30,
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
    marginBottom: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
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
});

export default WelcomeScreen;