import {StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import { isIOS } from './src/utils/theme/responsiveTheme';
import {
  requestAndroidNotificationPermission,
  requestIOSNotificationPermission,
  onDisplayNotification,
} from './src/utils/notification/notificationUtils';

const App = () => {

  useEffect(() => {
    isIOS ? requestIOSNotificationPermission() : requestAndroidNotificationPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      onDisplayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#202124' }}>
      <AppNavigator />
    </View>
  );
};

export default App;

