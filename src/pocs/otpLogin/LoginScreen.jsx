import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Use this for the dropdown
import { useNavigation } from '@react-navigation/native'; // Importing navigation

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default to India (+91)
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // For navigation to Welcome Screen

  // Handle sending OTP
  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true); // Show loading spinner
    try {
      // Simulate OTP sending for demo purposes (dummy OTP is 1234)
      const generatedOtp = '1234';

      // Simulate delay to mimic server call
      setTimeout(() => {
        Alert.alert('Success', 'OTP sent successfully!');
        setIsOtpSent(true); // Show OTP input field
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Handle OTP Verification
  const handleOtpVerification = () => {
    // Dummy OTP verification logic
    if (otp === '1234') {
      Alert.alert('Success', 'OTP verified successfully!');
      // Navigate to Welcome Screen after successful OTP verification
      navigation.navigate('Welcome Screen');
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>OTP Login</Text>

      {/* Country Code and Phone Number Input */}
      {!isOtpSent && (
        <View style={styles.inputContainer}>
          {/* Country Code Selector */}
          <Picker
            selectedValue={countryCode}
            onValueChange={(itemValue) => setCountryCode(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="+91 (India)" value="+91" />
            <Picker.Item label="+1 (USA)" value="+1" />
            <Picker.Item label="+44 (UK)" value="+44" />
            <Picker.Item label="+61 (Australia)" value="+61" />
            {/* Add more countries as needed */}
          </Picker>

          {/* Phone Number Input */}
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter phone number"
            keyboardType="numeric"
            maxLength={10} // Limit to 10 digits
            value={phoneNumber}
            onChangeText={(text) => {
              // Allow only numeric input
              if (/^\d*$/.test(text)) setPhoneNumber(text);
            }}
          />
        </View>
      )}

      {/* OTP Input (Visible after sending OTP) */}
      {isOtpSent && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter OTP"
            keyboardType="numeric"
            maxLength={4} // Limit OTP to 4 digits
            value={otp}
            onChangeText={(text) => setOtp(text)}
          />
        </View>
      )}

      {/* Send OTP Button */}
      {!isOtpSent && (
        <TouchableOpacity style={styles.button} onPress={handleSendOtp} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send OTP</Text>
          )}
        </TouchableOpacity>
      )}

      {/* Verify OTP Button */}
      {isOtpSent && (
        <TouchableOpacity style={styles.button} onPress={handleOtpVerification}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  picker: {
    width: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  phoneInput: {
    flex: 1,
    padding: 15,
    marginLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
