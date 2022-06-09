import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListItem } from "@rneui/themed";
const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "AZ12AQW",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "19HWR5",
  },
];

const NewOrders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = () => {
    setLoading(true);
    axios
      .get("https://myfoodcms189.herokuapp.com/api/restaurant-orders")
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //   useEffect(() => {
  //     getOrders();
  //   }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(39, 39, 39, 1)",
        paddingTop: 20,
      }}
    >
      <View style={{ marginLeft: 100, marginRight: 100 }}>
        <Text style={{ color: "white", fontSize: 22, fontWeight: "800" }}>
          New
        </Text>
      </View>
      <ScrollView style={{ marginTop: 10, marginLeft: 100, marginRight: 100 }}>
        {list.map((l, i) => (
          <>
            <>
              <TouchableOpacity
                style={{ backgroundColor: "#3fff00", flex: 1 }}
                onPress={() => navigation.navigate("detailedOrder")}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginTop: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginLeft: 10,
                    }}
                  >
                    name
                  </Text>
                  <Text style={{ marginRight: 10 }}>{l.status}</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginTop: 6,
                  }}
                >
                  <Text style={{ marginLeft: 10, paddingBottom: 10 }}>
                    AFZSJSD
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{ margin: 6, backgroundColor: "rgba(39, 39, 39, 1)" }}
              ></View>
            </>
          </>
        ))}
      </ScrollView>
    </View>
  );
};

export default NewOrders;

const styles = StyleSheet.create({});
