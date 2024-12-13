import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './components/SignInOptions/WelcomeScreen'
import Login from './components/SignInOptions/Login'
import SignUp from './components/SignInOptions/SignUp'
import OPTVerification from './components/SignInOptions/OTPCode'
import EnterPhone from './components/ForgotPassword/EnterPhone'
import PhoneVerification from './components/ForgotPassword/PhoneVerificationCode'
import SetNewPassword from './components/ForgotPassword/SetNewPassword'
import Timetable from './components/Timetable&Schedules/Timetable'
import ScheduleForm from './components/Timetable&Schedules/ScheduleForm'
import AddTask from './components/TaskPlanner/AddTasks'
import Tasks from './components/TaskPlanner/AddTasks';
import CWACalculator from './components/AvgCalculator/AverageCalculator'
import GetSignedUp from './IntroScreens/GetSignedUp'
import ScheduleIntro from './IntroScreens/ScheduleIntro'
import NotificationIntro from './IntroScreens/NotificationsIntro'
import AiBotIntro from './IntroScreens/AiBotIntro'
import AiChatTip from './components/AiChat/ChatIntro'
import AiChat from './components/AiChat/ChatScreen'
import Home from './components/Home/Home'
import EditProfile from './components/ProfileSettings/EditProfile'
import CustomDrawer from './components/CustomNavigations/CustomDawer'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="GetSignedUp"
        screenOptions={{
          headerShown: false, // Show header
        }}>
          <Stack.Screen
          name="GetSignedUp"
          component={GetSignedUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScheduleIntro"
          component={ScheduleIntro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationIntro"
          component={NotificationIntro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AiBotIntro"
          component={AiBotIntro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OPTVerification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnterPhone"
          component={EnterPhone}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailVerification"
          component={PhoneVerification}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="SetNewPassword"
          component={SetNewPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TimeTable"
          component={Timetable}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScheduleForms"
          component={ScheduleForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Task"
          component={Tasks}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTask}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CWACalculator"
          component={CWACalculator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AiChatTip"
          component={AiChatTip}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AiChat"
          component={AiChat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomDrawer"
          component={CustomDrawer}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;