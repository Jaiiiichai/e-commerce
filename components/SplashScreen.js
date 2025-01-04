// components/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet,Text } from 'react-native';


const Splash = ({ navigation }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
  
        navigation.replace('WelcomeScreen');
      }, 4000);
  
      return () => clearTimeout(timer);
    }, [navigation]);
  
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>LuxuraSpace </Text>
        <Text style={styles.tagline}>Your Comfort, Our Priority</Text>
        <Text style={styles.message}>Discover stylish furniture for every corner of your home</Text>
      </View>
    );
  };
  const styles = StyleSheet.create({
    splashContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ff6600',
    },
    splashText: {
      fontSize: 32,
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    tagline: {
      fontSize: 18,
      color: '#fff',
      fontStyle: 'italic',
      marginBottom: 15,
    },
    message: {
      fontSize: 14,
      color: '#fff',
      textAlign: 'center',
      paddingHorizontal: 20,
    },
  });

  export default Splash;