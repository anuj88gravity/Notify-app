import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import NotificationScreen from './src/pocs/pushNotification/NotificationScreen';
import TodoScreen from './src/pocs/todoApp/TodoScreen';
import LoginScreen from './src/pocs/otpLogin/LoginScreen';
import WelcomeScreen from './src/pocs/otpLogin/WelcomeScreen';


const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>All POCs App</Text>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Push Notifications')}
      >
        <Text style={styles.cardText}>Push Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Todo App')}
      >
        <Text style={styles.cardText}>Todo App</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Login Screen')}
      >
        <Text style={styles.cardText}>Login App</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Push Notifications" component={NotificationScreen} />
        <Stack.Screen name="Todo App" component={TodoScreen} />
        <Stack.Screen name="Login Screen" component={LoginScreen} />
        {/* Add the Welcome Screen */}
        <Stack.Screen name="Welcome Screen" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f0f5',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    width: '90%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
});
