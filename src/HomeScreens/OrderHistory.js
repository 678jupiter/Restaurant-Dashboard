import { Dimensions, StyleSheet, Text, View } from "react-native";
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
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.colors} />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        // marginRight: 30,
        // marginBottom: 30,
        // marginLeft: 30,
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
        <Text>OrderHistory</Text>
      </View>

      <View>
        <ListItem bottomDivider containerStyle={{ backgroundColor: "#edeff0" }}>
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
            key={i}
            bottomDivider
            onPress={() =>
              navigation.navigate("orderHistory", {
                address: item.attributes.address,
                amount: item.attributes.amount,
                customermobilenumber: item.attributes.customermobilenumber,
                courierName: item.attributes.courierName,
                dishes: item.attributes.dishes,
                mpesaReceiptNumber: item.attributes.mpesaReceiptNumber,
                status: item.attributes.status,
                userName: item.attributes.userName,
                Oid: item.id,
              })
            }
          >
            {/* <Icon
              color="white"
              size={22}
              name="done"
              style={{ backgroundColor: "green", borderRadius: 10 }}
            /> */}
            <ListItem.Title style={{ marginRight: 20, width: windowWidth / 7 }}>
              {item.attributes.status}
            </ListItem.Title>
            <ListItem.Content
              style={{
                // alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <ListItem.Title style={{ width: windowWidth / 4 }}>
                {item.attributes.mpesaReceiptNumber}
              </ListItem.Title>

              <ListItem.Title style={{ width: windowWidth / 4 }}>
                {item.attributes.userName}
              </ListItem.Title>
              <ListItem.Title>
                Ksh {""}
                items.
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </View>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({});
