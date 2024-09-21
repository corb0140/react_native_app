import { Platform } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";

let os = Platform.OS;
let myStyle = {};

if (os === "ios") {
  myStyle.flexDirection = "row";
} else if (os === "android") {
  myStyle.flexDirection = "row-reverse";
} else {
  console.log("Other OS");
}

export default function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://random-data-api.com/api/v2/users?size=10")
      .then((response) => {
        if (!response.ok) {
          throw Error("Network request failed");
        }

        return response.json();
      })
      .then((resp) => {
        return setData(resp);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      console.log("cleanup");
      // console.log("data", data[1]);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Users List:</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.infoContainer}>
            <UserAvatar size={80} borderRadius={10} name={item.first_name} />

            <View style={styles.itemsContainer}>
              <Text style={styles.itemText}>ID: {item.id}</Text>
              <Text style={styles.itemText}>First Name: {item.first_name}</Text>
              <Text style={styles.itemText}>Last Name: {item.last_name}</Text>
            </View>
          </View>
        )}
      ></FlatList>
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
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: myStyle.flexDirection,
    justifyContent: "space-around",
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "90%",
  },
  itemsContainer: {
    flexDirection: "column",
    gap: 3,
    width: "60%",
  },
  itemText: {
    fontSize: 17,
  },
});
