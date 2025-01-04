// components/BuyNow.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BuyNow = ({ navigation, route }) => {
  const { item } = route.params || {}; // Get the item details passed from the previous screen

  // Check if item is defined
  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Item details are not available.</Text>
      </View>
    );
  }

  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    address: '',
    contact: '',
    paymentMethod: '',
  });

  const handleInputChange = (key, value) => {
    setBuyerInfo({ ...buyerInfo, [key]: value });
  };

  const handleBuyNow = async () => {
    // Create a new order object
    const order = {
      id: Date.now().toString(),
      items: [item],
      total: item.price,
      buyerInfo: {}, // You can add buyer info if needed
      status: 'Pending', // Default status
      date: new Date().toISOString(),
    };
  
    // Save the order to AsyncStorage
    try {
      const storedOrders = await AsyncStorage.getItem('orders');
      const orders = storedOrders ? JSON.parse(storedOrders) : [];
      orders.push(order);
      await AsyncStorage.setItem('orders', JSON.stringify(orders));
  
      // Navigate to the OrderDetails page with the new order object
      navigation.navigate('OrderDetails', { order });
    } catch (error) {
      console.error('Error saving order:', error);
      Alert.alert('Error', 'There was an error processing your order.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buy Now</Text>

      {/* Item Details */}
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</Text>
      </View>

      {/* Buyer Info Form */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={buyerInfo.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={buyerInfo.address}
        onChangeText={(text) => handleInputChange('address', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={buyerInfo.contact}
        keyboardType="phone-pad"
        onChangeText={(text) => handleInputChange('contact', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Payment Method (e.g., Credit Card, Cash)"
        value={buyerInfo.paymentMethod}
        onChangeText={(text) => handleInputChange('paymentMethod', text)}
      />

      {/* Buy Now Button */}
      <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
        <Text style={styles.buyButtonText}>Confirm Purchase</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#2ecc71',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    textAlign: 'center',
    color: '#e74c3c',
    marginTop: 20,
  },
});

export default BuyNow;