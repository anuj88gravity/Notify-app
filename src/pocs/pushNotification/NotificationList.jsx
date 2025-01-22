// src/pocs/pushNotification/NotificationList.js
import React from 'react';
import { View, Text, Image, StyleSheet,FlatList } from 'react-native';


const NotificationList = ({ messages }) => {
  const renderMessage = ({ item }) => {
    const isOffer = item.title.toLowerCase().includes('offer') || item.body.toLowerCase().includes('offer');
    const messageColor = isOffer ? styles.offerMessage : styles.regularMessage;

    return (
      <View style={[styles.messageContainer, messageColor]}>
        <View style={styles.messageContent}>
          <View style={styles.messageText}>
            <Text style={styles.messageType}>{item.type} Message</Text>
            <Text style={styles.messageTitle}>{item.title}</Text>
            <Text style={styles.messageBody}>{item.body}</Text>
          </View>
          {item.imageUrl && (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.messageImage}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={renderMessage}
    />
  );
};

export default NotificationList;

const styles = StyleSheet.create({
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
});
