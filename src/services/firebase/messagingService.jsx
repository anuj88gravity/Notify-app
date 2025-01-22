// src/services/firebase/messagingService.js
import messaging from '@react-native-firebase/messaging';

export const getToken = async () => {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (err) {
    console.warn('Error fetching token:', err);
    throw err;
  }
};

export const onMessageListener = (callback) => {
  return messaging().onMessage(callback);
};

export const setBackgroundMessageHandler = (callback) => {
  return messaging().setBackgroundMessageHandler(callback);
};
