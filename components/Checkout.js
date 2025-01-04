// components/Checkout.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = ({ route, navigation }) => {
  const { cartItems } = route.params || [];
  const [currentCart, setCurrentCart] = useState([]);
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    address: '',
    contact: '',
    paymentMethod: '',
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCurrentCart(JSON.parse(storedCart));
      }
    };
    fetchCartItems();
  }, []);

  const handleInputChange = (key, value) => {
    setBuyerInfo({ ...buyerInfo, [key]: value });
  };

  const handleConfirmPurchase = async () => {
    const { name, address, contact, paymentMethod } = buyerInfo;

    // Check for empty fields
    if (!name || !address || !contact || !paymentMethod) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    // Create the order object
    const order = {
      id: Date.now().toString(), // Unique ID for the order
      items: cartItems,
      total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      buyerInfo,
      status: 'Pending', // Default status
      date: new Date().toISOString(), // Add the current date
    };

    // Save the order to AsyncStorage
    try {
      const storedOrders = await AsyncStorage.getItem('orders');
      const orders = storedOrders ? JSON.parse(storedOrders) : [];
      orders.push(order);
      await AsyncStorage.setItem('orders', JSON.stringify(orders));

      Alert.alert('Purchase Successful', 'Thank you for your purchase!');

      // Remove purchased items from the cart
      const updatedCart = currentCart.filter(item => !cartItems.some(purchasedItem => purchasedItem.id === item.id));
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));

      // Clear the selected items after purchase
      await AsyncStorage.removeItem('selectedCartItems');
      navigation.navigate('Main'); // Navigate back to Home screen
    } catch (error) {
      console.error('Error saving order:', error);
      Alert.alert('Error', 'There was an error processing your order.');
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.cartItemName}>{item.name}</Text>
            <Text style={styles.cartItemPrice}>${item.price} x {item.quantity}</Text>
            <Text style={styles.cartItemTotal}>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />

      <View style={styles.cartSummary}>
        <Text style={styles.summaryText}>Total Amount: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</Text>
      </View>

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
        placeholder="Payment Method"
        value={buyerInfo.paymentMethod}
        onChangeText={(text) => handleInputChange('paymentMethod', text)}
      />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPurchase}>
        <Text style={styles.confirmButtonText}>Confirm Purchase</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  cartItem: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#636e72',
  },
  cartItemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00b894',
  },
  cartSummary: {
    marginVertical: 25,
  },
  summaryText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3436',
  },
  input: {
    height: 45,
    borderColor: '#dfe6e9',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  confirmButton: {
    backgroundColor: '#0984e3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#b2bec3',
    marginTop: 40,
  },
});

export default Checkout;
