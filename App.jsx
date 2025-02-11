import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import messaging from '@react-native-firebase/messaging';
// import store from './src/redux/store';
import { isIOS } from './src/utils/theme/responsiveTheme';
import {
  requestAndroidNotificationPermission,
  requestIOSNotificationPermission,
  onDisplayNotification,
} from './src/utils/notification/notificationUtils';
import store from './src/redux/Store';

const App = () => {
  
  useEffect(() => {
    if (isIOS) {
      requestIOSNotificationPermission();
    } else {
      requestAndroidNotificationPermission();
    }
  }, []);

  useEffect(() => {
    // Foreground Notification Listener
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      onDisplayNotification(remoteMessage);
    });

    // Cleanup listener on unmount
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </GestureHandlerRootView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202124',
  },
});

export default App;