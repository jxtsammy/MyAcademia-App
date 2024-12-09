import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';

const EditProfileScreen = ({navigation}) => {
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
  const [name, setName] = useState('Sallo Samuel');
  const [email, setEmail] = useState('roberflames001@gmail.com');
  const [phone, setPhone] = useState('+233-25725 6751');
  const [password, setPassword] = useState('q2345321');
  const [showPassword, setShowPassword] = useState(false); // State for hiding/unhiding password

  // Function to open gallery
  const selectImageFromGallery = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Action Was Cancelled');
      } else if (response.errorCode) {
        console.error('Error:', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setProfilePicture(uri); // Update the profile picture state
      }
    });
  };

  // Save profile function
  const saveProfile = () => {
    Alert.alert('Profile Saved', 'Your changes have been saved successfully.');
    console.log('Saved Profile:', { name, email, phone, password });
  };

  // Delete account function
  const deleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Account Deleted');
            Alert.alert('Account Deleted', 'Your account has been deleted successfully.');
            // Add your account deletion logic here
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView>
        {/* Header Section with Back Button */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
        </View>

        {/* Profile Picture Section */}
        <View style={styles.profilePictureContainer}>
          <Image
            source={
              profilePicture
                ? { uri: profilePicture }
                : require('../../assets/okarun.jpg') // Default picture
            }
            style={styles.profilePicture}
          />
          <TouchableOpacity
            style={styles.cameraIconContainer}
            onPress={selectImageFromGallery} // Trigger gallery selection
          >
            <MaterialIcons name="edit" size={26} color="white" />
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={25} color="#01796f" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="#01796f" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email Address"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="phone" size={24} color="#01796f" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="#01796f" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="New Password"
            secureTextEntry={!showPassword} // Hide/unhide password
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={24}
              color="#01796f"
            />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.updateButton} onPress={saveProfile}>
          <Text style={styles.updateButtonText}>Save</Text>
        </TouchableOpacity>

        {/* Delete Account Button */}
        <TouchableOpacity style={styles.deleteButton} onPress={deleteAccount}>
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginVertical: 25,
    marginBottom: 40,
  },
  profilePicture: {
    width: 110,
    height: 110,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#01796f',
    borderRadius: 20,
    padding: 5,
    right: 130,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#01796f',
    paddingVertical: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#01796f',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 60,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;