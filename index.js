import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

// Handle background messages from Firebase
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);

  // Display the notification
  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'Default Title',
    body: remoteMessage.notification?.body || 'Default Body',
    android: {
      channelId: 'custom-channel',
    },
  });
});

// Handle background events for notifications
notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('Notifee background event:', { type, detail });

  if (type === EventType.PRESS) {
    // Handle notification press
    console.log('Notification pressed:', detail.notification);
    // Here you can navigate to a specific screen, log data, etc.
  }
});

AppRegistry.registerComponent(appName, () => App);
