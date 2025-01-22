import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

export const createNotificationChannel = async () => {
  await notifee.createChannel({
    id: 'custom-channel',
    name: 'Custom Channel',
    sound: 'custom_sound', // Ensure `custom_sound.mp3` exists in `android/app/src/main/res/raw/`
    importance: AndroidImportance.HIGH,
  });
};

export const requestFCMToken = async (setFcmToken) => {
  try {
    const token = await messaging().getToken();
    setFcmToken(token);
    console.log('FCM Token:', token);
  } catch (err) {
    console.warn('Error fetching token:', err);
  }
};

export const handleNewMessage = (remoteMessage, type, setMessages) => {
  const newMessage = {
    id: remoteMessage.messageId,
    title: remoteMessage.notification?.title || 'No Title',
    body: remoteMessage.notification?.body || 'No Body',
    imageUrl: remoteMessage.notification?.android?.imageUrl || null,
    type,
  };
  setMessages((prevMessages) => [newMessage, ...prevMessages]);
};

export const showNotification = async (remoteMessage) => {
  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'Default Title',
    body: remoteMessage.notification?.body || 'Default Body',
    android: {
      channelId: 'custom-channel',
      pressAction: { id: 'default' },
      smallIcon: 'ic_launcher', // Ensure this icon is set in Android
      largeIcon: remoteMessage.notification?.android?.imageUrl || null,
    },
  });
};
