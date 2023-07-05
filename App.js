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
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios
      .get('http://192.168.43.112:8001/read')
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
      if (name === data[i].name) {
        if (password === data[i].code) {
          console.log('HERE');
          console.log(password);
          navigation.navigate('Home');
          setName(name);
          loginSuccessful = true;
        }
      }
    }

    if (!loginSuccessful) {
      Snackbar.show({
        text: 'Incorrect username or password',
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
        placeholder="Username"
        onChangeText={text => setName(text)}
        value={name}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
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
