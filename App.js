import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Screens/home';

function HomeScreen() {
  return <Home />;
}

function LoginScreen({ navigation }) {
  const [admissionNo, setAdmissionNo] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleLogin = () => {
    axios
      .get('http://192.168.29.57:8001/teacher/classdata/read')
      .then(response => {
        console.log(response.data);
        checkLogin(response.data);
      })
      .catch(error => {
        Snackbar.show({
          text: 'Something went wrong, please try again',
          duration: Snackbar.LENGTH_SHORT,
          action: {
            textColor: '#CAD5E2',
          },
        });
        console.log(error);
      });
  };

  const checkLogin = data => {
    let loginSuccessful = false;

    for (let i = 0; i < data.length; i++) {
      if (admissionNo === data[i].ADMISSION_NUMBER.toString() && dateOfBirth === data[i].Date_of_Birth.toString()) {
        navigation.navigate('Home');
        setAdmissionNo('');
        setDateOfBirth('');
        loginSuccessful = true;
        break;
      }
    }

    if (!loginSuccessful) {
      Snackbar.show({
        text: 'Incorrect admission number or date of birth',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          textColor: '#CAD5E2',
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Admission Number"
        onChangeText={text => setAdmissionNo(text)}
        value={admissionNo}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Date of Birth (e.g., 40635)"
        onChangeText={text => setDateOfBirth(text)}
        value={dateOfBirth}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  BackHandler.addEventListener('hardwareBackPress', function () {
    return true;
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
