// components/Orders.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Add useFocusEffect
import { MaterialIcons } from '@expo/vector-icons';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  const fetchOrders = async () => {
    try {
      const storedOrders = await AsyncStorage.getItem('orders');
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        const activeOrders = parsedOrders.filter((order) => order.status !== 'Received' && order.status !== 'Cancelled');
        const sortedOrders = activeOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Use useFocusEffect to refresh data when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>

      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.orderContainer}
              onPress={() => navigation.navigate('OrderDetails', { order: item })}
            >
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
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="inbox" size={48} color="#7f8c8d" />
          <Text style={styles.emptyText}>No orders found</Text>
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

export default Orders;