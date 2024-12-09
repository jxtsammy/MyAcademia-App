import React, { useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PanResponder,
} from 'react-native';

const NotificationIntro = ({ navigation }) => {
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Start the pan responder if the swipe is horizontal and significant
        return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          // Swipe left detected, navigate to the next screen
          navigation.navigate('AiBotIntro');
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container} {...panResponder.panHandlers}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../assets/NotificationIntro.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Get Notified</Text>
        <Text style={styles.subtitle}>
          Recieve alert notifications some munites before the next schedule to keep you up to date on what is next
        </Text>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>
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
    bottom: 80,
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
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#c4c4c4',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#01796f',
    width: 30,
  },
});

export default NotificationIntro;