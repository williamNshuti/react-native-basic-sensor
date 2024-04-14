import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  SafeAreaView,
} from "react-native";
import { LightSensor } from "expo-sensors";
import BrigtnessScreen from "../component/Brightness";
import ProgressCircle from "../component/ProgressBar";
import { categorizeIlluminance, luxToPercentage } from "../util/util";

export default function LightSensorPage() {
  const [{ illuminance }, setData] = useState({ illuminance: 0 });
  useEffect(() => {
    _toggle();

    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    this._subscription = LightSensor.addListener(setData);
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Light Sensor</Text>
      <View style={styles.contentContainer}>
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>
            Illuminance:{" "}
            {Platform.OS === "android"
              ? `${Math.round(illuminance)} lx`
              : `Only available on Android`}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={_toggle}
            style={[styles.button, { backgroundColor: "#2196F3" }]}
          >
            <Text style={styles.buttonText}>Toggle</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ProgressCircle illuminance={illuminance} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  dataContainer: {
    marginBottom: 20,
    backgroundColor: "#32a16d",
    padding: 20,
    borderRadius: 10,
  },
  dataText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
