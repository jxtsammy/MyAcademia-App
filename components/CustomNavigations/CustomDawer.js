import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';

const CustomDrawer = ({ navigation }) => {
  return (
    <View style={styles.drawerContainer}>
      <ImageBackground
        source={require('../../assets/HomeBg.jpg')}
        style={styles.drawerContent}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlayContainer}>
          <View style={styles.drawerHeader}>
            <View style={styles.profileContainer}>
              <Image
                source={require('../../assets/okarun.jpg')}
                style={styles.profileImage}
              />
              <Text style={styles.profileText}>Sallo Samuel</Text>
              <Text style={styles.profileEmail}>robertflames001@gmail.com</Text>
            </View>
          </View>
          <View style={styles.drawerOptions}>
            <TouchableOpacity style={styles.drawerOption} onPress={() => navigation.navigate('Home')}>
              <Feather name="home" size={24} color="#fff" />
              <Text style={styles.drawerOptionText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => navigation.navigate('Timetable')}>
              <Feather name="calendar" size={24} color="#fff" />
              <Text style={styles.drawerOptionText}>Timetable</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => navigation.navigate('Tasks')}>
              <Feather name="check-square" size={24} color="#fff" />
              <Text style={styles.drawerOptionText}>Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => navigation.navigate('CWACalculator')}>
              <Feather name="grid" size={24} color="#fff" />
              <Text style={styles.drawerOptionText}>CWA Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => navigation.navigate('AiChat')}>
              <Feather name="message-circle" size={24} color="#fff" />
              <Text style={styles.drawerOptionText}>Chat ACE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => navigation.navigate()}>
              <Feather name="bell" size={24} color="#fff" />
              <Text style={styles.drawerOptionText}>Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => navigation.navigate('EditProfile')}>
              <Feather name="user" size={24} color="#fff" />
              <Text style={styles.drawerOptionText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerOption} onPress={() => navigation.navigate('Login')}>
              <Feather name="log-out" size={24} color="#fff" />
              <Text style={styles.drawerOptionText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%', // Ensure full width
    height: '100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  drawerContent: {
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  drawerHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 50,
    position: 'flex-start'
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileEmail: {
    fontSize: 18,
    color: '#fff',
  },
  drawerOptions: {
    gap: 16,
  },
  drawerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  drawerOptionText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CustomDrawer;