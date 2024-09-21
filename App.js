import { Platform } from "react-native";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  let os = Platform.OS;

  if (os === "ios") {
    console.log("iOS");
  } else if (os === "android") {
    console.log("Android");
  } else {
    console.log("Other OS");
  }

  return (
    <View style={styles.container}>
      <Text>{os}</Text>
      <StatusBar style="auto" />
    </View>
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
