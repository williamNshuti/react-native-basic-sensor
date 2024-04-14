import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView, Alert
} from "react-native";
import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";
import RotationScreen from "../component/Rotation";
import * as Notifications from 'expo-notifications';
import { useRef } from "react";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      
    }),
  });

export default function AccelerometerPage() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
    const motionDetectedRef = useRef(false);


  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(30);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData)); 
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);
  const sendNotification = async (titles,message) => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: titles,
            body: message,
          },
          trigger: null,
        });
      };
 
useEffect(() => {
    const handleMotionDetection = ({ x, y, z }) => {
      const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
      const threshold = 2;

      if (acceleration > threshold) {
        if (!motionDetectedRef.current) {
          motionDetectedRef.current = true;
          sendNotification("Motion Detected", "Motion has been detected!!!");
          setTimeout(() => {
            motionDetectedRef.current = false;
          }, 5000);
        }
      }
    };

    const subscribeAccelerometer = () => {
      const subscription = Accelerometer.addListener(handleMotionDetection);
      return () => subscription.remove();
    };

    const unsubscribeAccelerometer = subscribeAccelerometer();
    return unsubscribeAccelerometer;
  }, [sendNotification]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Accelerometer</Text>
      <RotationScreen />
       {/* <View style={styles.contentContainer}>
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>
            Accelerometer: (in gs where 1g = 9.81 m/s^2)
          </Text>
          <Text style={styles.dataText}>x: {x}</Text>
          <Text style={styles.dataText}>y: {y}</Text>
          <Text style={styles.dataText}>z: {z}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={subscription ? _unsubscribe : _subscribe}
            style={[
              styles.button,
              { backgroundColor: subscription ? "#FF5733" : "#4CAF50" },
            ]}
          >
            <Text style={styles.buttonText}>
              {subscription ? "Stop" : "Start"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={_slow}
            style={[
              styles.button,
              styles.middleButton,
              { backgroundColor: "#FF9800" },
            ]}
          >
            <Text style={styles.buttonText}>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={_fast}
            style={[styles.button, { backgroundColor: "#2196F3" }]}
          >
            <Text style={styles.buttonText}>Fast</Text>
          </TouchableOpacity>
        </View>
      </View> */}
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
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
  },
  dataText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 7,
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
