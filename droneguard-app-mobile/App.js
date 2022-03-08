import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import Login from './screens/Login';
import Loader from './components/Loader';
import Streaming from './screens/Streaming.js';

export default function App() {

  return (
    <View style={styles.container}>
      <Streaming />
      {/* <Login /> */}
      {/* <Loader /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});