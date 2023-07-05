import * as React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Text, View, Image, TouchableOpacity, StyleSheet,useState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function Attendance() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Attendance Screen</Text>
    </View>
  );
}
 
function Timetable() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Timetable Screen</Text>
    </View>
  );
}

function Events() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Events Screen</Text>
    </View>
  );
}

function Calendar() {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' }
        }}
        minDate={'2000-01-01'} // Set the minimum selectable date
        maxDate={'2090-12-31'} // Set the maximum selectable date
      />
      {selectedDate !== '' && (
        <View style={styles.eventContainer}>
          <Text style={styles.eventText}>Events on {selectedDate}:</Text>
          <Events />
        </View>
      )}
    </View>
  );
}

function Blogs() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Blogs Screen</Text>
    </View>
  );
}

function Chat() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chat Screen</Text>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ position: 'absolute', top: 10, right: 10 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Image source={require('../Images/AnotherImage.jpeg')} style={{ width: 25, height: 25 }} />
      </TouchableOpacity>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function DashBoard() {
  return (
    <NavigationContainer>
      <View style={{  flex: 1 }}>
          {/* Image */}
          <View style={{position: 'absolute', top: 100, left: 100}}>
          <Image  
            source={require('../Images/Studentprofile.jpeg')}
            style={{ width: 180, height: 200 }} // Adjust the width and height as per your preference
          />
        </View>
        </View>
        <Tab.Navigator>
          <Tab.Screen name="Attendance" component={Attendance} />
          <Tab.Screen name="Timetable" component={Timetable} />
          <Tab.Screen name="Events" component={EventTabs} />
          <Tab.Screen name="Chat" component={Chat} />
        </Tab.Navigator>
        <SettingsScreen />
    </NavigationContainer>
  );
}

function EventTabs({ navigation }) {
  const [activeTab, setActiveTab] = React.useState('Blogs');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, activeTab === 'Blogs' ? styles.activeButton : null]}
        onPress={() => handleTabPress('Blogs')}
      >
        <Text style={styles.buttonText}>Blogs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, activeTab === 'Calendar' ? styles.activeButton : null]}
        onPress={() => handleTabPress('Calendar')}
      >
        <Text style={styles.buttonText}>Calendar</Text>
      </TouchableOpacity>
      <View style={styles.tabContent}>
        {activeTab === 'Blogs' && <Blogs />}
        {activeTab === 'Calendar' && <Calendar />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
  },
  activeButton: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    fontSize: 16,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

