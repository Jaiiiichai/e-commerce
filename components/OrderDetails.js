// components/OrderDetails.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const OrderDetails = ({ route }) => {
  const navigation = useNavigation();
  const { order } = route.params;

  const handleCancelOrder = async (orderDetails) => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel Order',
          onPress: async () => {
            try {
              const storedOrders = await AsyncStorage.getItem('orders');
              const orders = storedOrders ? JSON.parse(storedOrders) : [];
              const updatedOrders = orders.map((order) => {
                if (order.id === orderDetails.id) {
                  return { ...order, status: 'Cancelled' };
                }
                return order;
              });
              await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
              Alert.alert('Order Cancelled', 'Your order has been cancelled successfully.');
              navigation.goBack();
            } catch (error) {
              console.error('Error cancelling order:', error);
              Alert.alert('Error', 'There was an error cancelling your order.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleOrderReceived = async (orderDetails) => {
    try {
      const storedOrders = await AsyncStorage.getItem('orders');
      const orders = storedOrders ? JSON.parse(storedOrders) : [];
      const updatedOrders = orders.map((order) => {
        if (order.id === orderDetails.id) {
          return { ...order, status: 'Received' };
        }
        return order;
      });
      await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
      Alert.alert('Order Received', 'Your order has been marked as received.');
      navigation.goBack();
    } catch (error) {
      console.error('Error marking order as received:', error);
      Alert.alert('Error', 'There was an error marking your order as received.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="receipt" size={48} color="#4CAF50" />
        <Text style={styles.title}>Order Details</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.orderId}>Order ID: {order.id}</Text>
        <Text style={styles.orderDate}>
          Order Date: {new Date(order.date).toLocaleDateString()}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Items:</Text>
      {order.items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDetails}>
            Price: <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </Text>
          <Text style={styles.itemDetails}>
            Quantity: <Text style={styles.itemQuantity}>{item.quantity}</Text>
          </Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Buyer Information:</Text>
      <View style={styles.card}>
        <Text style={styles.buyerInfo}>
          <MaterialIcons name="person" size={16} /> Name: {order.buyerInfo.name}
        </Text>
        <Text style={styles.buyerInfo}>
          <MaterialIcons name="location-on" size={16} /> Address: {order.buyerInfo.address}
        </Text>
        <Text style={styles.buyerInfo}>
          <MaterialIcons name="phone" size={16} /> Contact: {order.buyerInfo.contact}
        </Text>
        <Text style={styles.buyerInfo}>
          <MaterialIcons name="payment" size={16} /> Payment Method: {order.buyerInfo.paymentMethod}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Order Status:</Text>
      <View style={[styles.card, styles.statusCard]}>
        <Text style={[styles.orderStatus, order.status === "Delivered" ? styles.statusDelivered : styles.statusPending]}>
          {order.status}
        </Text>
      </View>

      <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelOrder(order)}>
        <Text style={styles.cancelButtonText}>Cancel Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.receivedButton} onPress={() => handleOrderReceived(order)}>
        <Text style={styles.receivedButtonText}>Order Received</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 16,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#555',
  },
  itemPrice: {
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontWeight: 'bold',
  },
  buyerInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  statusCard: {
    alignItems: 'center',
  },
  orderStatus: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusDelivered: {
    color: '#4CAF50',
  },
  statusPending: {
    color: '#FF9800',
  },
  cancelButton: {
    backgroundColor: '#FF5733',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  receivedButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  receivedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OrderDetails;