import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';

import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const WelcomeScreen = ({ navigation }) => {
  // Handle logout action
  const handleLogout = () => {
    storage.set('isLoggedIn', false); // Clear login state
    Alert.alert('Logout', 'You have been logged out successfully.', [
      {
        text: 'OK',
        onPress: () => navigation.replace('Login Screen'),
      },
    ]);
  };
  

  return (
    <ImageBackground
      source={{ uri: 'https://via.placeholder.com/600x400' }} // Replace with your image URL or local asset
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>Welcome to the Dashboard!</Text>
        <Text style={styles.subheading}>
          Explore features, track progress, and manage everything in one place.
        </Text>

        {/* Button to go back to Home */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')} // Navigate to Home screen
        >
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for better contrast
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 15,
    backgroundColor: '#ff4d4d', // Red for logout
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
