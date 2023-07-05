import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import { NativeBaseProvider } from 'native-base';

import Calendar from './calendar';
import Event from './Event';
import Timetable from './timetable1';
import Chat from './Homechat';
import Settings from './setting';

function HomeScreen() {
  return (
    <NativeBaseProvider>
      <Calendar />
    </NativeBaseProvider>
  );
}

function EventScreen() {
  return (
    <NativeBaseProvider>
      <Event />
    </NativeBaseProvider>
  );
}

function TimetableScreen() {
  return (
    <NativeBaseProvider>
      <Timetable />
    </NativeBaseProvider>
  );
}

function ChatScreen() {
  return (
    <NativeBaseProvider>
      <Chat />
    </NativeBaseProvider>
  );
}

function SettingsScreen() {
  return (
    <NativeBaseProvider>
      <Settings />
    </NativeBaseProvider>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Home() {
  const getTabIcon = (route, focused, color, size) => {
    let iconName;

    if (route === 'Home') {
      iconName = focused ? 'home' : 'home';
    } else if (route === 'Chat') {
      iconName = focused ? 'message-circle' : 'message-circle';
    } else if (route === 'Event') {
      iconName = focused ? 'calendar' : 'calendar';
    } else if (route === 'Timetable') {
      iconName = focused ? 'clock' : 'clock';
    } else if (route === 'Settings') {
      iconName = focused ? 'settings' : 'settings';
    }

    return <Icon name={iconName} size={size} color={color} />;
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                tabBarIcon: ({ focused, color, size }) => {
                  return getTabIcon(route.name, focused, color, size);
                },
                tabBarInactiveTintColor: 'gray',
                tabBarActiveTintColor: 'tomato',
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Tab.Screen name="Event" component={EventScreen} options={{ headerShown: false }} />
              <Tab.Screen name="Timetable" component={TimetableScreen} options={{ headerShown: false }} />
              <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
              <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
