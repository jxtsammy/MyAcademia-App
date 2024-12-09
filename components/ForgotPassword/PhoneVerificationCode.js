import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Image } from 'react-native';

const EmailVerificationScreen = ({navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isResending, setIsResending] = useState(false);

  // References for the OTP inputs
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResending(true);
      const response = await axios.post('https://your-api-endpoint.com/resend-otp');

      if (response.data.success) {
        Alert.alert('Success', 'A new OTP has been sent to your phone.');
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while resending OTP.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.navText} >←</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>

      <Text style={styles.title}>Email verification code</Text>
      <Text style={styles.subText}>
        Enter the code sent to your <Text style={styles.Email}> Email</Text>
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)} // Assign ref for each input
            style={[styles.otpBox, digit ? styles.activeOtpBox : null]}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
            value={digit}
            returnKeyType="next"
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
                inputRefs.current[index - 1].focus(true);
              }
            }}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={() => navigation.navigate('SetNewPassword')}>
        <Text style={styles.verifyButtonText}>Verify Now</Text>
      </TouchableOpacity>

       <TouchableOpacity onPress={handleResendOtp} disabled={isResending}>
        <Text style={[styles.resendText, isResending && { color: '#aaa' }]}>
          Didn't receive a code? <Text style={styles.resendLink}>Resend</Text>
        </Text>
      </TouchableOpacity>

      <Image
          source={require('../../assets/airplane.png')} // Replace with your image path
          style={styles.image}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
 nav: {
        flexDirection: 'row',
        marginBottom: 100,
        marginRight: 140,
        display: 'flex',
        alignItems: 'center',
    justifyContent: 'center'
    },
  navText: {
    fontSize: 30,
    fontWeight: '600',
    marginRight: 180,
  },
  image: {
    width: 550,
    height: 300,
    resizeMode: 'contain',
    top: 75,
    right: 90
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
    marginTop: 60,
  },
  subText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  Email: {
    fontWeight: '700',
    color: '#000',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: '#fff',
    marginRight: 10
  },
  activeOtpBox: {
    borderColor: '#01796F',
  },
  resendText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    marginTop: 15
  },
  resendLink: {
    color: '#01796F',
    fontWeight: '600',
  },
  verifyButton: {
    backgroundColor: '#01796F',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default EmailVerificationScreen;