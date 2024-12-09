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
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { Ionicons } from '@expo/vector-icons';

const ForgotPasswordScreen = ({navigation}) => {
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('1');
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
        style={styles.keyboardAvoidView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainContainer}>
            <View style={styles.nav}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.navText}>←</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <Image
                source={require('../../assets/ForgotPassword.png')}
                style={styles.image}
              />
              <Text style={styles.forgotText}>Forgot Password</Text>

              <Text style={styles.subtitle}>
                Enter your phone number associated with your account for verification code
              </Text>

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
                    returnKeyType="done"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.ContinueButton}
                onPress={() => {
                  Keyboard.dismiss();
                  navigation.navigate('PhoneVerification');
                }}
              >
                <Text style={styles.ContinueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  keyboardAvoidView: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  nav: {
    flexDirection: 'row',
    left: 10,
  },
  navText: {
    fontSize: 30,
    fontWeight: '600',
    marginRight: 10,
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
    height: 310,
    marginBottom: 30,
    resizeMode: 'contain',
    top: -50
  },
  forgotText: {
    fontSize: 35,
    fontWeight: '300',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 40,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  // Phone input styles
  phoneContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
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
  ContinueButton: {
    width: '100%',
    backgroundColor: '#1C6559',
    paddingVertical: 17,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  ContinueButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;