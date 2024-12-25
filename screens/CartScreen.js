import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Switch, TextInput } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Retrieve cart items from navigation params
  const { cartItems: initialCartItems } = route.params || {};
  const [cartItems, setCartItems] = useState(initialCartItems); // Use state to manage cart items
  const [useWallet, setUseWallet] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const handleIncrease = (item) => {
    const updatedItems = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCartItems(updatedItems);
  };

  const handleDecrease = (item) => {
    const updatedItems = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        if (cartItem.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return null; // Mark for removal
      }
      return cartItem;
    }).filter(item => item !== null); // Remove null entries
    setCartItems(updatedItems);
  };

  const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price.replace(/Rs\. /, '').replace(/,/g, '')) * item.quantity, 0);
  const tax = subtotal * 0.16;
  const grandTotal = subtotal + tax - (useWallet ? 50 : 0); // Example wallet discount of Rs. 50

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>My Cart</Text>

        {cartItems.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image
              source={item.image} // Use item image directly
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price} x {item.quantity}</Text>
            </View>
            {/* Quantity Control */}
            <View style={styles.quantityControl}>
              <TouchableOpacity onPress={() => handleDecrease(item)} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleIncrease(item)} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Wallet and Promo Code Section */}
        <View style={styles.walletContainer}>
          <Text style={styles.walletText}>Use Wallet: Rs. 50.00</Text>
          <Switch value={useWallet} onValueChange={setUseWallet} />
        </View>

        <View style={styles.promoContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Enter Promo Code"
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <TouchableOpacity style={styles.applyPromoButton}>
            <Text style={styles.applyPromoButtonText}>Apply Promo</Text>
          </TouchableOpacity>
        </View>

        {/* Summary Section */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Subtotal: Rs. {subtotal.toFixed(2)}</Text>
          <Text style={styles.summaryText}>Tax (16%): Rs. {tax.toFixed(2)}</Text>
          {useWallet && <Text style={styles.summaryText}>Wallet Discount: Rs. -50.00</Text>}
          <Text style={styles.summaryText}>Grand Total: Rs. {grandTotal.toFixed(2)}</Text>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Order')}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

// Add your existing styles here...
const styles = StyleSheet.create({
  // Your existing styles remain unchanged
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
    paddingBottom: 120, // Add space for the footer
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
     textAlign: "center",

  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    paddingHorizontal: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#555",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  walletContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  walletText: {
    fontSize: 16,
  },
  promoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
  },
  applyPromoButton: {
    backgroundColor: "#003580",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  applyPromoButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  summary: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 8,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  checkoutButton: {
    backgroundColor: "#003580",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },


});
