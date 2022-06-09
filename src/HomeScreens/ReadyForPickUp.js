import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "AZ12AQW",
    status: "Ready",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "19HWR5",
    status: "Picked Up",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "19HWR5",
    status: "Ready",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "19HWR5",
    status: "Ready",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "19HWR5",
    status: "PickedUp",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "19HWR5",
    status: "Ready",
  },
];

const drivers = [
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

const ReadyForPickUp = () => {
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
    // <View style={{ flex: 1, backgroundColor: "black" }}>
    //   <ScrollView style={{ backgroundColor: "indigo", flex: 0.05 }}></ScrollView>
    //   <View style={{ backgroundColor: "purple", flex: 0.8 }}></View>
    //   <View style={{ backgroundColor: "yellow", flex: 0.2 }}></View>
    // </View>
    <View style={{ flex: 1, backgroundColor: "rgba(39, 39, 39, 1)" }}>
      <View style={{ marginLeft: 100, marginRight: 100, flex: 0.05 }}>
        <Text style={{ color: "white", fontSize: 22, fontWeight: "800" }}>
          Ready
        </Text>
      </View>
      <View style={{ flex: 0.8 }}>
        <ScrollView
          style={{
            marginTop: 10,
            marginLeft: 100,
            marginRight: 100,
            flex: 0.8,
          }}
        >
          {list.map((l, i) => (
            <>
              <View style={{ backgroundColor: "white", flex: 1 }}>
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
              </View>
              <View
                style={{ margin: 6, backgroundColor: "rgba(39, 39, 39, 1)" }}
              ></View>
            </>
          ))}
        </ScrollView>
      </View>

      <View style={{ flex: 0.3 }}>
        <ScrollView horizontal>
          {drivers.map((item, i) => (
            <Card containerStyle={{ width: 150, height: 150 }}>
              <View style={{ position: "relative", alignItems: "center" }}>
                <Image
                  style={{
                    width: "100%",
                    height: 80,
                  }}
                  resizeMode="contain"
                  source={{
                    uri: "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4",
                  }}
                />
                <Text>{item.name}</Text>
                <Text>Arriving</Text>
                <Text>{item.subtitle}</Text>
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ReadyForPickUp;

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
