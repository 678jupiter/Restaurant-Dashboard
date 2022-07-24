import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { ListItem, Icon } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../Redux/orderActions";

const OrderHistoryScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;

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
      <SafeAreaView
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      >
        <ActivityIndicator size="large" color="black" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          flex: 0.08,
          justifyContent: "center",
          paddingRight: 10,
          paddingLeft: 10,
        }}
      >
        <Text>Order History</Text>
      </View>

      <View>
        <ListItem
          bottomDivider
          containerStyle={{ backgroundColor: "#edeff0", height: 50 }}
        >
          <ListItem.Title style={{ width: windowWidth / 7 }}>
            Status
          </ListItem.Title>
          <ListItem.Content
            style={{
              // alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <ListItem.Title style={{ marginLeft: 40 }}>Order</ListItem.Title>

            <ListItem.Title>Customer</ListItem.Title>
            <ListItem.Title style={{ marginRight: 78 }}>Paid</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        {restaurantOrders?.data?.map((item, i) => (
          <ListItem
            containerStyle={{
              height: 50,
            }}
            key={i}
            bottomDivider
            onPress={() =>
              navigation.navigate("orderHistory", {
                userName: `${item.attributes.userName}`,
                dish: item.attributes.dishes,
                orderNumber: `${item.attributes.mpesaReceiptNumber}`,
                orderId: item.id,
                customermobilenumber: item.attributes.customermobilenumber,
                shipping: item.attributes.shipping,
                createdAt: item.attributes.createdAt,
                address: item.attributes.address,
                status: item.attributes.status,
                totalPaid: item.attributes.totalPaid,
                methodofPayment: item.attributes.methodOfPayment,
                methodofDelivery: item.attributes.methodOfDelivery,
                verificationMessage: item.attributes.verificationMessage,
              })
            }
          >
            {/* <Icon
              color="white"
              size={22}
              name="done"
              style={{ backgroundColor: "green", borderRadius: 10 }}
            /> */}
            <ListItem.Title
              style={{
                marginRight: 20,
                fontFamily: "MontserratSemiBold",
                width: windowWidth / 7,
              }}
            >
              {item.attributes.status}
            </ListItem.Title>
            <ListItem.Content
              style={{
                // alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <ListItem.Title
                style={{
                  width: windowWidth / 4,
                  fontFamily: "MontserratSemiBold",
                }}
              >
                {item.attributes.mpesaReceiptNumber}
              </ListItem.Title>

              <ListItem.Title
                style={{
                  width: windowWidth / 4,
                  fontFamily: "MontserratSemiBold",
                }}
              >
                {item.attributes.userName}
              </ListItem.Title>
              <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
                Ksh {""}
                items.
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({});
