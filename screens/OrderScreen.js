import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Order</Text>

      {/* Sample content for Order Screen */}
      <Text style={styles.subtitle}>Thank you for your purchase!</Text>
      <Text style={styles.details}>Your order will be delivered soon.</Text>

      {/* Button to go back to Cart */}
      <View>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.buttonText}>Back to Menu</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  goBackButton: {
    backgroundColor: '#003580',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
