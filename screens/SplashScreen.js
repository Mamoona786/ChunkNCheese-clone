import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {
  // Automatically navigate to LoginScreen after 2 seconds
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {/* Centered Image */}
      <Image
        source={require("../assets/your-image.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Footer Text */}
      <View style={styles.footer}>
        <Text style={styles.poweredText}>{"Powered by"}</Text>
        <Text style={styles.blinkText}>{"Blink"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B02A4",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    alignItems: "center",
  },
  poweredText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "300",
  },
  blinkText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
