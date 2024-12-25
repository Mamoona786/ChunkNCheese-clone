import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import Geocoder from 'react-native-geocoding';

// Initialize Geocoder with your API key (get it from Google Cloud Console)
Geocoder.init("AIzaSyCsH-Hacl0miebmZxwZvHYCZe-rbQQhrI8"); // Replace with your actual API key

export default function HomeScreen({ navigation }) {
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null); // Reference for MapView

  const areas = {
    Lahore: [
      "Allama Iqbal Town",
      "Anarkali",
      "Awan Town",
      "Bahria Town",
      "Bedian Road",
      "Bilal Ganj",
      "Canal View",
      "Cantt",
      "Chungi Amar Sidhu",
      "DHA",
      "Faisal Town",
      "Ferozepur Road",
      "Garden Town",
      "Green Town",
      "Gulberg",
      "Gulshan Ravi",
      "Harbanspura",
      "Iqbal Park",
      "Islampura",
      "Jail Road",
      "Johar Town",
      "Kahna",
      "Kot Lakhpat",
      "LDA Avenue",
      "Mall Road",
      "Mansoora",
      "Model Town",
      "Mozang",
      "Mughalpura",
      "Mustafa Town",
      "New Muslim Town",
      "Old Anarkali",
      "PCSIR",
      "Raiwind",
      "Ring Road",
      "Sabzazar",
      "Saddar",
      "Samanabad",
      "Sanda",
      "Shadman",
      "Shahdara",
      "Shalimar Town",
      "Sundar Industrial Estate",
      "Thokar Niaz Baig",
      "Township",
      "Valencia Town",
      "Wapda Town",
      "Waris Road",
    ],
    Faisalabad: [
      "Afghanabad",
      "Ayub Colony",
      "Batala Colony",
      "Chenab Chowk",
      "Clock Tower",
      "D-Ground",
"Dijkot Road",
"Factory Area",
"Faisalabad Industrial Estate",
"Gatwala",
"Ghulam Muhammad Abad",
"GTS Chowk",
"Gulistan Colony",
"Jaranwala Road",
"Jhang Road",
"Kohinoor Town",
"Madina Town",
"Millat Town",
"Muslim Town",
"Nazimabad",
"Nishatabad",
"Peoples Colony",
"Raza Abad",
"Railway Road",
"Risalewala",
"Samundri Road",
"Samanabad",
"Satiana Road",
"Susan Road",
"Tariqabad",
    ],
  };

  const handleConfirm = () => {
    if (city && area) {
      navigation.navigate("Menu");
    } else {
      alert("Please select both City and Area");
    }
  };

  async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true; // iOS permissions are handled differently
    }
  }

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
      return;
    }

    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }, 1000);

        // Use geocoding to get city and area
        try {
          const response = await Geocoder.from(latitude, longitude);
          const addressComponent = response.results[0].address_components;

          // Extract city and area based on address components
          let cityName = '';
          let areaName = '';

          addressComponent.forEach(component => {
            if (component.types.includes("locality")) {
              cityName = component.long_name; // City name
            }
            if (component.types.includes("sublocality") || component.types.includes("neighborhood")) {
              areaName = component.long_name; // Area name
            }
          });

          setCity(cityName);
          setArea(areaName);
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Could not retrieve address information.');
        }
      },
      (error) => {
        Alert.alert('Error', error.message);
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : 31.5497, // Default to Lahore's lat
          longitude: location ? location.longitude : 74.3436, // Default to Lahore's long
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker coordinate={location} title={"Your Location"} />
        )}
      </MapView>

      <View style={styles.locationContainer}>
        <Text style={styles.heading}>Please select your location</Text>

        {/* City Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>City / Region</Text>
          <Picker
            selectedValue={city}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setCity(itemValue);
              setArea("");
            }}
          >
            <Picker.Item label="Select City" value="" />
            <Picker.Item label="Lahore" value="Lahore" />
            <Picker.Item label="Faisalabad" value="Faisalabad" />
          </Picker>
        </View>

        {/* Area Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Area / Sub-Region</Text>
          <Picker
            selectedValue={area}
            style={styles.picker}
            onValueChange={(itemValue) => setArea(itemValue)}
            enabled={!!city}
          >
            <Picker.Item label="Select Area" value="" />
            {city &&
              areas[city].map((areaItem, index) => (
                <Picker.Item key={index} label={areaItem} value={areaItem} />
              ))}
          </Picker>
        </View>

        {/* Confirm Location Button */}
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm Location</Text>
        </TouchableOpacity>

        {/* Locate Me Button */}
        {/* <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={getLocation}>
          <Text style={styles.buttonText}>Locate Me</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  locationContainer: { padding: 15 },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  dropdownContainer: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5 },
  picker: { height: 50, width: '100%', backgroundColor: '#f9f9f9' },
  button: {
    backgroundColor: '#1B02A4',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
