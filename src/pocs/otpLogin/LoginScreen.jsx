import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import SmsRetriever from 'react-native-sms-retriever';
import { useNavigation } from '@react-navigation/native';

import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resendTimer, setResendTimer] = useState(60); // Countdown timer for resend OTP
  const navigation = useNavigation();

  useEffect(() => {
    if (isOtpSent) {
      let timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOtpSent]);

  // Start SMS Retriever to fetch OTP automatically
  const startSmsRetriever = async () => {
    try {
      const smsToken = await SmsRetriever.startSmsRetriever();
      SmsRetriever.addSmsListener((event) => {
        const otpRegex = /\d{6}/; // Adjust regex for 6-digit OTP
        const otp = event.message.match(otpRegex)?.[0];
        if (otp) {
          setOtp(otp);
          SmsRetriever.removeSmsListener();
        }
      });
    } catch (error) {
      console.error('Failed to start SMS retriever:', error);
    }
  };

  // Handle sending OTP
  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiUrl = 'http://143.110.241.10:8000/api/generate-otp/';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber }),
      };

      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      if (response.ok) {
        setIsOtpSent(true);
        setResendTimer(60); // Reset timer for resend
        startSmsRetriever(); // Start listening for OTP SMS
        setError(null);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Verification
  const handleOtpVerification = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiUrl = 'http://143.110.241.10:8000/api/verify-otp/';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber, otp }),
      };

      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'OTP verified successfully!');
        storage.set('isLoggedIn', true);
        navigation.navigate('Welcome Screen');
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>OTP Login</Text>

      {/* Phone Number Input */}
      {!isOtpSent && (
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="Enter phone number"
            keyboardType="numeric"
            maxLength={10}
            value={phoneNumber}
            onChangeText={(text) => {
              if (/^\d*$/.test(text)) setPhoneNumber(text);
            }}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}

      {/* OTP Input */}
      {isOtpSent && (
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="Enter 6-digit OTP"
            keyboardType="numeric"
            maxLength={6}
            value={otp}
            onChangeText={(text) => setOtp(text)}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
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
        <TouchableOpacity style={styles.button} onPress={handleOtpVerification} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>
      )}

      {/* Resend OTP Button */}
      {isOtpSent && resendTimer === 0 && (
        <TouchableOpacity style={styles.button} onPress={handleSendOtp} disabled={loading}>
          <Text style={styles.buttonText}>Resend OTP</Text>
        </TouchableOpacity>
      )}

      {/* Resend Timer */}
      {isOtpSent && resendTimer > 0 && (
        <Text style={styles.timerText}>Resend OTP in {resendTimer} seconds</Text>
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
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
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
  timerText: {
    fontSize: 14,
    color: '#555',
  },
});

export default LoginScreen;
