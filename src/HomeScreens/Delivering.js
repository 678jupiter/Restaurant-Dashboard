import {
  ActivityIndicator,
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
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../Redux/orderActions";

const Delivering = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let isCancelled = false;
    dispatch(fetchOrders());
    return () => {
      isCancelled = true;
    };
  }, [dispatch]);

  const restaurantOrders = useSelector(
    (state) => state.orders.restaurantOrders
  );
  if (restaurantOrders.length === 0) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.colors} />
      </View>
    );
  }
  const i = restaurantOrders.data;
  const result = i.filter((item) => item.attributes.status === "Delivering");
  //console.log(result);

  if (result.length !== 0) {
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
            Delivering
          </Text>
        </View>
        <ScrollView
          style={{ marginTop: 10, marginLeft: 100, marginRight: 100 }}
        >
          {result.map((l, i) => (
            <View key={l.id}>
              <TouchableOpacity
                style={{ backgroundColor: "white", flex: 1 }}
                onPress={() =>
                  navigation.navigate("deliveringDetailed", {
                    userName: `${l.attributes.userName}`,
                    dish: l.attributes.dishes,
                    orderNumber: `${l.attributes.mpesaReceiptNumber}`,
                    orderId: l.id,
                    status: l.attributes.status,
                    customermobilenumber: l.attributes.customermobilenumber,
                    courierName: l.attributes.courierName,
                    courierMobileNumber: l.attributes.courierMobileNumber,
                  })
                }
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
                      color: "black",
                    }}
                  >
                    {l.attributes.userName}
                  </Text>
                  <Text style={{ marginRight: 10, color: "black" }}>
                    {l.attributes.status}
                  </Text>
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
                    {l.attributes.mpesaReceiptNumber}
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{ margin: 6, backgroundColor: "rgba(39, 39, 39, 1)" }}
              ></View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "rgba(39, 39, 39, 1)",
          paddingTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 40 }}>No New Orders.</Text>
      </View>
    );
  }
};

export default Delivering;

const styles = StyleSheet.create({});
