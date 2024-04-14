import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Brightness from 'expo-brightness';

export default function BrigtnessScreen() {
  const [currentBrightness, setCurrentBrightness] = useState(1);

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        // Set initial brightness
        setCurrentBrightness(Math.random());
        Brightness.setSystemBrightnessAsync(currentBrightness);
      }
    })();

    // Function to change brightness after 5 seconds
    const changeBrightness = async () => {
      setTimeout(async () => {
        const newBrightness = Math.random(); // Generate a random brightness value between 0 and 1
        setCurrentBrightness(newBrightness); // Update state with new brightness value
        await Brightness.setSystemBrightnessAsync(newBrightness); // Apply new brightness
      }, 5000); // Wait for 5 seconds before changing brightness
    };

    // Call the function initially and then every 5 seconds
    changeBrightness();
    setInterval(changeBrightness, 5000);
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: currentBrightness > 0.5? 'black' : 'white'}]}>
      <Text>Brightness: {Math.round(currentBrightness * 100)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
