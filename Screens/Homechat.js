import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const ChatScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Screen</Text>
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('ChatWindow', { chatId: 'chat1' })}
      >
        <Text style={styles.chatText}>Chat 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('ChatWindow', { chatId: 'chat2' })}
      >
        <Text style={styles.chatText}>Chat 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('ChatWindow', { chatId: 'chat3' })}
      >
        <Text style={styles.chatText}>Chat 3</Text>
      </TouchableOpacity>
    </View>
  );
};

const ChatWindow = ({ route }) => {
  const { chatId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Window</Text>
      <Text style={styles.chatText}>{`Chat ${chatId}`}</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatWindow" component={ChatWindow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chatItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatText: {
    fontSize: 18,
  },
});

export default App;
