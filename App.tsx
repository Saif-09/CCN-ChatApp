import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';


const App = () => {
  return (
    // <GestureHandlerRootView style={{ flex: 1, }}>
    <View style={{ flex: 1, backgroundColor: '#202124' }}>
      <AppNavigator />
    </View>
  // </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})