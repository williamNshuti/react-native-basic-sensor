import { StyleSheet, Text, View } from "react-native";
import BasicCompass from "../component/BasicCompass";

export default function MagnetometerPage() {
  return (
    <View style={styles.container}>
      <BasicCompass />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
