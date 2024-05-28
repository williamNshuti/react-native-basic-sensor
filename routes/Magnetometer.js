import { StyleSheet, Text, View } from "react-native";
import BasicCompass from "../component/BasicCompass";

export default function MagnetometerPage() {
  return (
    <SafeAreaView style={styles.container}>
      <BasicCompass />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
