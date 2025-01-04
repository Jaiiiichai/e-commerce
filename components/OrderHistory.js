// components/OrderHistory.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  const fetchOrderHistory = async () => {
    try {
      const storedOrders = await AsyncStorage.getItem('orders');
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        const sortedOrders = parsedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrderHistory(sortedOrders);
      }
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>

      {orderHistory.length > 0 ? (
        <FlatList
          data={orderHistory}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderContainer}>
              <View style={styles.orderHeader}>
                <MaterialIcons name="receipt" size={24} color="#4CAF50" />
                <Text style={styles.orderId}>Order ID: {item.id}</Text>
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderStatus}>
                  <MaterialIcons name="info" size={16} color="#FF9800" /> Status: {item.status}
                </Text>
                <Text style={styles.orderDate}>
                  <MaterialIcons name="calendar-today" size={16} color="#03A9F4" /> Date: {new Date(item.date).toLocaleDateString()}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="inbox" size={48} color="#7f8c8d" />
          <Text style={styles.emptyText}>No order history found</Text>
        </View>
      )}
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  orderContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  orderInfo: {
    marginLeft: 34,
  },
  orderStatus: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 16,
    color: '#555',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginTop: 10,
  },
});

export default OrderHistory;