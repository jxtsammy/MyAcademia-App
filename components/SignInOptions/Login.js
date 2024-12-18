import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CountryPicker from 'react-native-country-picker-modal';

const LoginScreen = ({navigation}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('GH');
  const [callingCode, setCallingCode] = useState('233');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <Image
                source={require('../../assets/loginimg.png')}
                style={styles.image}
              />
              <Text style={styles.welcomeText}>Welcome back!</Text>

              {/* Phone Number Input Container */}
              <View style={styles.phoneContainer}>
                {/* Country Code Picker */}
                <TouchableOpacity
                  style={styles.countryPickerContainer}
                  onPress={() => setCountryPickerVisible(true)}
                >
                  <CountryPicker
                    visible={countryPickerVisible}
                    onClose={() => setCountryPickerVisible(false)}
                    onSelect={onSelectCountry}
                    countryCode={countryCode}
                    withFilter
                    withFlagButton
                    withCallingCode
                    withCountryNameButton={false}
                    containerButtonStyle={styles.countryPickerButton}
                  />
                  <Text style={styles.callingCodeText}>+{callingCode}</Text>
                  <Ionicons name="chevron-down" size={16} color="#333" />
                </TouchableOpacity>

                {/* Phone Number Input */}
                <View style={styles.phoneNumberContainer}>
                  <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Phone Number"
                    placeholderTextColor="#888"
                    style={styles.phoneNumberInput}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#888"
                  style={styles.input}
                  secureTextEntry={!passwordVisible}
                  returnKeyType="done"
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={passwordVisible ? 'eye' : 'eye-off'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  navigation.navigate('EnterPhone');
                }}
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {
                  Keyboard.dismiss();
                  navigation.navigate('Home');
                }}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <Text style={styles.signUpText}>
                Don't have an account?{' '}
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.signUpLink}>Sign up</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 550,
    height: 340,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: '300',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  phoneContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  countryPickerContainer: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 50,
  },
  countryPickerButton: {
    alignItems: 'center',
  },
  callingCodeText: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 5,
  },
  phoneNumberContainer: {
    width: '67%',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 25,
  },
  phoneNumberInput: {
    height: 50,
    fontSize: 18,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 18,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    color: 'red',
    left: 120
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#01796F',
    paddingVertical: 17,
    borderRadius: 30,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  signUpText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  signUpLink: {
    fontWeight: '600',
    color: '#01796F',
  },
});

export default LoginScreen;