import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export const requestAndroidNotificationPermission = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
            title: 'Notification Permission',
            message:
                'This app needs access to your notification ' +
                'so you can get notified when you are not using the app.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getToken();
        console.log('Notification permission granted');
    } else {
        console.log('Notification permission denied');
    }
};

export const requestIOSNotificationPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        getToken();
        console.log('Authorization status:', authStatus);
    }
};

export const onDisplayNotification = async (remoteMessage) => {
    if (!remoteMessage?.notification) return; // Ensure remoteMessage has a notification object

    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    await notifee.displayNotification({
        title: remoteMessage.notification.title || 'Notification',
        body: remoteMessage.notification.body || 'No message body provided.',
        android: {
            channelId,
            smallIcon: 'ic_launcher',
            pressAction: {
                id: 'default',
            },
        },
    });
};

export const getToken = async () => {
    const token = await messaging().getToken();
    console.log('token', token);
};