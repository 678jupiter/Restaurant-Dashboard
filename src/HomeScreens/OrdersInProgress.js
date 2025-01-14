import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../Redux/orderActions";
import { format } from "timeago.js";

const OrdersInProgress = ({ navigation }) => {
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
  const result = i.filter((item) => item.attributes.status === "Cooking");
  console.log(result);
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
          <Text style={{ color: "white", fontSize: 20 }}>In progress</Text>
        </View>
        <ScrollView
          style={{ marginTop: 10, marginLeft: 100, marginRight: 100 }}
        >
          {result.map((l, i) => (
            <View key={i} style={{ height: 50 }}>
              <TouchableOpacity
                style={{ backgroundColor: "white", flex: 1 }}
                onPress={() =>
                  navigation.navigate("inProgressDetailed", {
                    username: l.attributes.userName,
                    orderNumber: l.attributes.mpesaReceiptNumber,
                    dish: l.attributes.dishes,
                    orderId: l.id,
                    status: l.attributes.status,
                    cteatedAt: l.attributes.createdAt,
                    customermobilenumber: l.attributes.customermobilenumber,
                    createdAt: l.attributes.createdAt,
                    address: l.attributes.address,
                    shipping: l.attributes.shipping,
                    totalPaid: l.attributes.totalPaid,
                    methodofPayment: l.attributes.methodOfPayment,
                    methodofDelivery: l.attributes.methodOfDelivery,
                    verificationMessage: l.attributes.verificationMessage,
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
        <Text style={{ color: "white", fontSize: 30 }}>
          No Orders In Progress
        </Text>
      </View>
    );
  }
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
