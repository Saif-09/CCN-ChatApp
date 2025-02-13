import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import axios from 'axios';
import { getItem } from '../mmkvStorage';
import { BASE_URL } from '../../api';



export const requestAndroidNotificationPermission = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
            title: 'Notification Permission',
            message:
                'This app needs access to your notifications ' +
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

// Fetch and send FCM token to the backend
export const getToken = async () => {
    try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);

        const authToken = getItem('access_token'); // Get stored auth token
        if (!authToken) {
            console.error('User not authenticated. Cannot send FCM token.');
            return;
        }

        // API Call to Send FCM Token
        const response = await axios.post(`${BASE_URL}/api/update-fcm-token/`, { fcm_token: token }, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        if (response.status === 200) {
            console.log('FCM Token sent successfully:', response.data.message);
        } else {
            console.error('Failed to send FCM Token:', response.data);
        }
    } catch (error) {
        console.error('Error fetching or sending FCM token:', error.response?.data || error.message);
    }
};