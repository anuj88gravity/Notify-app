import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, FlatList, Button, Image } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import messaging from '@react-native-firebase/messaging';
import { createNotificationChannel, handleNewMessage, showNotification } from './NotificationHandler';

const NotificationScreen = () => {
  const [messages, setMessages] = useState([]);
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    createNotificationChannel();
    requestFCMToken();

    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground message:', remoteMessage);
      handleNewMessage(remoteMessage, 'Foreground', setMessages);
      showNotification(remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Background message:', remoteMessage);
      handleNewMessage(remoteMessage, 'Background', setMessages);
      showNotification(remoteMessage);
    });

    return () => unsubscribeForeground();
  }, []);

  const requestFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      setFcmToken(token);
      console.log('FCM Token:', token);
    } catch (err) {
      console.warn('Error fetching token:', err);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(fcmToken);
    Alert.alert('Token Copied!', 'FCM token has been copied to clipboard.');
  };

  const renderMessage = ({ item }) => {
    const isOffer = item.title.toLowerCase().includes('offer') || item.body.toLowerCase().includes('offer');
    return (
      <View style={[styles.messageContainer, isOffer ? styles.offerMessage : styles.regularMessage]}>
        <View style={styles.messageContent}>
          <View style={styles.messageText}>
            <Text style={styles.messageType}>{item.type} Message</Text>
            <Text style={styles.messageTitle}>{item.title}</Text>
            <Text style={styles.messageBody}>{item.body}</Text>
          </View>
          {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.messageImage} />}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Push Notifications</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        ListFooterComponent={
          <View style={styles.footer}>
            <Button title="Copy FCM Token" onPress={copyToClipboard} />
          </View>
        }
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  messageContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    flex: 1,
    marginRight: 10,
  },
  messageType: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageBody: {
    fontSize: 14,
    color: '#333',
  },
  messageImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  offerMessage: {
    backgroundColor: '#ffdddd',
  },
  regularMessage: {
    backgroundColor: '#ddddff',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
