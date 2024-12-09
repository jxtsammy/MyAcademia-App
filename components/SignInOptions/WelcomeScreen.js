import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/MyAcademiaLogo.png')} // Replace with your image path
          style={styles.image}
        />
        <Text style={styles.header}>My Academia app</Text>
        <Text style={styles.subtext}>
          Explore all the existing features that assists you in enhancing academic performance
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.registerText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'contain',
    top: -50
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#01796F',
    textAlign: 'center',
    lineHeight: 35,
    marginBottom: 20,
    marginTop: 30
  },
  subtext: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 50,
    paddingHorizontal: 20
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '85%',
  },
  loginButton: {
    backgroundColor: '#01796F',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 30,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'

  },
  registerButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
   width: '100%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#01796F',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerText: {
    color: '#01796F',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default WelcomeScreen;