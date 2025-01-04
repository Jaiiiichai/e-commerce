// components/Settings.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();

  const handleChangePassword = () => {
    // Logic to change password
    alert('Change Password functionality to be implemented');
  };

  const handlePrivacyPolicy = () => {
    // Logic to view privacy policy
    alert('Privacy Policy functionality to be implemented');
  };

  const handleTermsOfService = () => {
    // Logic to view terms of service
    alert('Terms of Service functionality to be implemented');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity style={styles.settingButton} onPress={handleChangePassword}>
        <Text style={styles.settingText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingButton} onPress={handlePrivacyPolicy}>
        <Text style={styles.settingText}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingButton} onPress={handleTermsOfService}>
        <Text style={styles.settingText}>Terms of Service</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  settingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Settings;