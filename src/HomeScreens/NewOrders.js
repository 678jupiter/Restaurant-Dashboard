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
import { colors } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "timeago.js";
import { useFocusEffect } from "@react-navigation/native";
const NewOrders = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      console.log("UseEffect");
      dispatch(fetchOrders());
      return () => {
        isActive = false;
      };
    }, [navigation])
  );

  const restaurantOrders = useSelector(
    (state) => state.orders.restaurantOrders
  );
  const userData = useSelector((state) => state.user.usermeta);
  if (restaurantOrders.length === 0) {
    return (
      <SafeAreaView
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "rgba(39, 39, 39, 1)",
        }}
      >
        <Text style={{ color: "white", fontSize: 30 }}>No New Orders.</Text>
      </SafeAreaView>
    );
  }

  if (loading === true) {
    return (
      <SafeAreaView
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "rgba(39, 39, 39, 1)",
        }}
      >
        <ActivityIndicator size="large" color={colors.blurple} />
      </SafeAreaView>
    );
  }
  const i = restaurantOrders.data;
  const result = i.filter((item) => item.attributes.status === "New");
  //console.log(result);

  if (result.length !== 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(39, 39, 39, 1)",
          //  paddingTop: 20,
        }}
      >
        <View style={{ marginLeft: 100, marginRight: 100 }}>
          <Text style={{ color: "white", fontSize: 20 }}>New</Text>
        </View>
        <ScrollView
          style={{ marginTop: 10, marginLeft: 100, marginRight: 100 }}
        >
          {result.map((l, i) => (
            <View key={l.id} style={{ height: 50 }}>
              <TouchableOpacity
                style={{ backgroundColor: "#3fff00", flex: 1 }}
                onPress={() =>
                  navigation.navigate("detailedOrder", {
                    userName: `${l.attributes.userName}`,
                    dish: l.attributes.dishes,
                    orderNumber: `${l.attributes.mpesaReceiptNumber}`,
                    orderId: l.id,
                    customermobilenumber: l.attributes.customermobilenumber,
                    shipping: l.attributes.shipping,
                    createdAt: l.attributes.createdAt,
                    address: l.attributes.address,
                    status: l.attributes.status,
                    totalPaid: l.attributes.totalPaid,
                    conversationId: l.attributes.conversationId,
                    methodofPayment: l.attributes.methodOfPayment,
                    methodofDelivery: l.attributes.methodOfDelivery,
                    verificationMessage: l.attributes.verificationMessage,
                  })
                }
                //onPress={() => console.log(l)}
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
                      fontSize: 15,
                      marginLeft: 10,
                    }}
                  >
                    {l.attributes.userName}
                  </Text>
                  <Text style={{ marginRight: 10 }}>{l.attributes.status}</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    //  marginTop: 6,
                  }}
                >
                  <Text
                    style={{ marginLeft: 10, paddingBottom: 10, fontSize: 10 }}
                  >
                    {l.attributes.mpesaReceiptNumber}
                  </Text>
                  <Text
                    style={{ marginRight: 10, paddingBottom: 10, fontSize: 10 }}
                  >
                    {format(l.attributes.publishedAt)}
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
        <Text style={{ color: "white", fontSize: 30 }}>No New Orders.</Text>
      </View>
    );
  }
};

export default NewOrders;

const styles = StyleSheet.create({});
