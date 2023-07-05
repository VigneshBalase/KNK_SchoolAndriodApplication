import React from 'react';
import { View, StyleSheet } from 'react-native';
import Timetable from './view';

const App = () => {
  return (
    <View style={styles.container}>
      <Timetable />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
