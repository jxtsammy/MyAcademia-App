import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryPicker from 'react-native-country-picker-modal';

const SignUpScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const validatePassword = (input) => {
    setPassword(input);
    if (input.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else {
      setPasswordError('');
    }
  };

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
              <View style={styles.logoContainer}>
                <View style={styles.logo}>
                  <Image
                    source={require('../../assets/welcomeimg.png')}
                    style={styles.image}
                  />
                </View>
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>
                  Register and get access to features to enhance your academic work
                </Text>
              </View>

              {/* Input Fields */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#999"
                  returnKeyType="next"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCapitalize="none"
                />

                {/* Phone Number Input Container */}
                <View style={styles.phoneContainer}>
                  {/* Country Code Picker */}
                  <TouchableOpacity
                    style={styles.countryPickerWrapper}
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
                    <Icon name="chevron-down" size={16} color="#333" />
                  </TouchableOpacity>

                  {/* Phone Number Input */}
                  <View style={styles.phoneInputWrapper}>
                    <TextInput
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      placeholder="Phone Number"
                      placeholderTextColor="#999"
                      style={styles.phoneInput}
                      keyboardType="phone-pad"
                      returnKeyType="next"
                    />
                  </View>
                </View>

                <View style={styles.passwordWrapper}>
                  <TextInput
                    style={styles.passwordInput}
                    secureTextEntry={!isPasswordVisible}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={validatePassword}
                    returnKeyType="done"
                  />
                  <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                    <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
                  </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
              </View>

              {/* Create Account Button */}
              <TouchableOpacity
                style={styles.createAccountButton}
                onPress={() => {
                  Keyboard.dismiss();
                  navigation.navigate('OTPVerification');
                }}
              >
                <Text style={styles.createAccountText}>Create Account</Text>
              </TouchableOpacity>

              {/* Footer */}
              <Text style={styles.footerText}>
                Do you have an account?{' '}
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.signInText}>Sign In</Text>
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
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 450,
    padding: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    padding: 20,
    marginBottom: 5,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#01796F',
    marginBottom: 5
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    paddingHorizontal: 15,
    fontSize: 14,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 30,
    marginBottom: 20,
    fontSize: 14,
    color: '#333',
    elevation: 1,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  countryPickerWrapper: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffff',
    paddingHorizontal: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 1,
    height: 60,
  },
  callingCodeText: {
    fontSize: 14,
    color: '#333',
  },
  phoneInputWrapper: {
    width: '66%',
    backgroundColor: '#ffff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#cccc',
    elevation: 1,
  },
  phoneInput: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontSize: 14,
    color: '#333',
  },
  countryPickerButton: {
    alignItems: 'center',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff',
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#cccc',
    paddingVertical: 5,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  createAccountButton: {
    backgroundColor: '#01796F',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  createAccountText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
    fontSize: 14,
  },
  signInText: {
    color: '#01796F',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;