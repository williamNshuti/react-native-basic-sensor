import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GpsScreen from "../component/GpsComponent";

export default function Gps() {
  return (
    <SafeAreaView style={styles.container}>
      <GpsScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
