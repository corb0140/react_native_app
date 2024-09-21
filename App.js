import { Platform } from "react-native";
import UserAvatar from "react-native-user-avatar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  RefreshControl,
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
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetch("https://random-data-api.com/api/v2/users?size=10")
      .then((response) => {
        if (!response.ok) {
          throw Error("Network request failed");
        }

        return response.json();
      })
      .then((resp) => {
        return setData([...resp]);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      console.log("cleanup");
    };
  }, []);

  function addOneUser() {
    fetch("https://random-data-api.com/api/v2/users?size=1")
      .then((response) => {
        if (!response.ok) {
          throw Error("Network request failed");
        }

        return response.json();
      })
      .then((resp) => {
        return setData([resp, ...data]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  let size = 80;
  let borderRadius = 10;

  function onRefresh() {
    setRefreshing(true);
    console.log("Refreshing...");
    fetch("https://random-data-api.com/api/v2/users?size=10")
      .then((response) => {
        if (!response.ok) {
          throw Error("Network request failed");
        }

        return response.json();
      })
      .then((resp) => {
        setData([...resp]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Users List:</Text>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.infoContainer}>
            <UserAvatar
              size={size}
              borderRadius={borderRadius}
              name={item.first_name}
            />

            <View style={styles.itemsContainer}>
              <Text style={styles.itemText}>First Name: {item.first_name}</Text>
              <Text style={styles.itemText}>Last Name: {item.last_name}</Text>
            </View>
          </View>
        )}
      ></FlatList>

      <Pressable style={styles.floatingActionButton} onPress={addOneUser}>
        <Text>
          <Ionicons name="add-circle" size={60} color="green" />
        </Text>
      </Pressable>
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
    gap: 10,
    width: "60%",
  },
  itemText: {
    fontSize: 17,
  },
  floatingActionButton: {
    position: "absolute",
    bottom: 10,
    right: 2,
    borderRadius: 50,
    padding: 10,
  },
});
