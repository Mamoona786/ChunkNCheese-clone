import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Top half with background color and logo */}
      <View style={styles.topHalf}>
        <Image
          source={require("../assets/your-image.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Bottom half with white background */}
      <View style={styles.bottomHalf}>
        <Text style={styles.heading}>Welcome to Chunk N Cheese 👋</Text>
        <Text style={styles.subHeading}>
          Please select your order type to continue
        </Text>

        {/* Delivery Option */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.replace("Home")}
        >
          <Image
            source={require("../assets/delivery.png")}
            style={styles.smallIcon}
          />
          <Text style={styles.optionText}>Delivery</Text>
          <Text style={styles.arrow}>{" >"}</Text>
        </TouchableOpacity>

        {/* Pick-Up Option */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.replace("Home")}
        >
          <Image
            source={require("../assets/pickup.png")}
            style={styles.smallIcon}
          />
          <Text style={styles.optionText}>Pick-Up</Text>
          <Text style={styles.arrow}>{" >"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    flex: 1,
    backgroundColor: "#1B02A4",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "60%",
    height: "60%",
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingVertical: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B02A4",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    width: "90%",
    paddingVertical: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "flex-start", // Aligns the text and icon to the left
  },
  smallIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1, // This ensures that the text takes up available space
  },
  arrow: {
    fontSize: 24,
    color: "#1B02A4",
    marginLeft: 10, // Adds space between the text and the arrow
  },
});
