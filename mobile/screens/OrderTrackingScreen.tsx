import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function OrderTrackingScreen() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // In real app, fetch from backend
    setOrders([
      { id: 1, menu: 'Party Platter', status: 'paid' },
      { id: 2, menu: 'Family Feast', status: 'pending' },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Tracking</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>Order #{item.id}: {item.menu} - {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  orderItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
}); 