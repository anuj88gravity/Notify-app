import notifee, { AndroidImportance } from '@notifee/react-native';

export const createNotificationChannel = async () => {
  await notifee.createChannel({
    id: 'custom-channel',
    name: 'Custom Channel',
    sound: 'custom_sound', // Add a custom sound file to `android/app/src/main/res/raw/`
    importance: AndroidImportance.HIGH,
  });
};
