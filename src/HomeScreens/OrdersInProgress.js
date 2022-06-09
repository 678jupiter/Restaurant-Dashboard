import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
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
    status: "Cooking",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "19HWR5",
    status: "Ready",
  },
];

const OrdersInProgress = ({ navigation }) => {
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
          In progress
        </Text>
      </View>
      <ScrollView style={{ marginTop: 10, marginLeft: 100, marginRight: 100 }}>
        {list.map((l, i) => (
          <>
            <TouchableOpacity
              style={{ backgroundColor: "white", flex: 1 }}
              onPress={() => navigation.navigate("inProgressDetailed")}
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
                    color: "black",
                    fontSize: 20,
                    fontWeight: "500",
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
                <Text style={{ marginRight: 10, paddingBottom: 10 }}>
                  10:25 AM
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{ margin: 6, backgroundColor: "rgba(39, 39, 39, 1)" }}
            ></View>
          </>
        ))}
      </ScrollView>
    </View>
  );
};

export default OrdersInProgress;

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: "column",
    alignSelf: "flex-end",
    justifyContent: "center",
    alignContent: "flex-end",
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey",
  },
});
