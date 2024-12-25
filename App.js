import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Menu' }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
        <Stack.Screen name="Order" component={OrderScreen} options={{ title: 'Your Order' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
