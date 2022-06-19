import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Card, ListItem } from "@rneui/themed";
import { Button, Icon } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchOrders } from "../Redux/orderActions";
import { Pressable } from "react-native";
import call from "react-native-phone-call";

const DetailedOrder = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const {
    userName,
    dish,
    orderNumber,
    orderId,
    customermobilenumber,
    status,
    totalPaid,
    address,
    createdAt,
    shipping,
  } = route.params;
  console.log(orderId);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const Cooking = async () => {
    setLoading1(true);
    await axios
      .put(`http://localhost:1337/api/restaurant-orders/${orderId}`, {
        data: {
          status: "Cooking",
        },
      })
      .then(function (response) {
        dispatch(fetchOrders());
        setLoading1(false);
        navigation.navigate("Orders in progress", {
          userName,
          dish,
          orderNumber,
          orderId,
        });
        //  setDeliveryStatus(ORDER_STATUSES.ACCEPTED);
      })
      .catch(function (error) {
        setLoading1(false);
        console.log(error);
      });
  };
  const ReadyForPickUp = async () => {
    setLoading2(true);
    await axios
      .put(`http://localhost:1337/api/restaurant-orders/${orderId}`, {
        data: {
          status: "Ready",
        },
      })
      .then(function (response) {
        dispatch(fetchOrders());
        setLoading2(false);
        navigation.navigate("Order Ready For PickUp", {
          userName,
          dish,
          orderNumber,
          orderId,
        });
        //  setDeliveryStatus(ORDER_STATUSES.ACCEPTED);
      })
      .catch(function (error) {
        setLoading2(false);
        console.log(error);
      });
  };
  const Decline = () => {
    setLoading3(true);

    axios
      .put(`http://localhost:1337/api/restaurant-orders/${orderId}`, {
        data: {
          status: "Declined",
        },
      })
      .then(function (response) {
        setLoading3(false);
        navigation.navigate("Order History");
        dispatch(fetchOrders());
      })
      .catch(function (error) {
        setLoading3(false);
        console.log(error);
      });
  };
  const createTwoButtonAlert = () =>
    Alert.alert("Cancel", `${userName}'s Order`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => Decline() },
    ]);
  const buttonAlert2 = () =>
    Alert.alert(`${userName}'s Order`, `is ReadyForPickUp`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => ReadyForPickUp() },
    ]);

  const buttonAlert3 = () =>
    Alert.alert(`Accept`, `${userName}'s Order`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => Cooking() },
    ]);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
              {userName}
            </ListItem.Title>
            <ListItem.Subtitle>{orderNumber}</ListItem.Subtitle>
          </ListItem.Content>
          <Pressable onPress={() => navigation.navigate("chartList")}>
            <Icon
              name="chat"
              color="black"
              size={32}
              style={{ marginRight: 10, padding: 6 }}
            />
          </Pressable>
          <Pressable
            onPress={() =>
              call({ number: `${customermobilenumber}`, prompt: false })
            }
          >
            <Ionicons
              name="call-outline"
              size={28}
              color="black"
              style={{ marginRight: 10, padding: 6 }}
            />
          </Pressable>

          <Text style={{ fontFamily: "MontserratSemiBold" }}>
            {customermobilenumber}
          </Text>
          <ListItem.Content>
            <View
              style={{
                alignSelf: "flex-end",
              }}
            >
              <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
                {createdAt}
              </ListItem.Title>
              <ListItem.Subtitle style={{ fontFamily: "MontserratSemiBold" }}>
                {address}
              </ListItem.Subtitle>
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
      <ScrollView style={{ backgroundColor: "white", flex: 1, marginTop: 20 }}>
        {dish.map((item, i) => (
          <Card key={i}>
            <ListItem.Content style={{}}>
              <View style={{ flexDirection: "row" }}>
                <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
                  {item.name}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{ marginLeft: 30, fontFamily: "MontserratSemiBold" }}
                >
                  x {item.quantity}
                </ListItem.Subtitle>
              </View>

              <View
                style={{
                  alignSelf: "flex-end",
                  //marginRight: 150,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      marginRight: 50,
                      fontFamily: "MontserratSemiBold",
                    }}
                  >
                    Subtotal
                  </Text>
                  <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
                    Ksh {""}
                    {item.price * item.quantity}
                  </ListItem.Title>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      marginRight: 82,
                      fontFamily: "MontserratSemiBold",
                    }}
                  >
                    Tax
                  </Text>
                  <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
                    Ksh {""}
                    tax
                    {/* {item.tax} */}
                  </ListItem.Title>
                </View>
              </View>
            </ListItem.Content>
          </Card>
        ))}
      </ScrollView>

      <View
        style={{ alignSelf: "flex-end", backgroundColor: "red", width: "20%" }}
      >
        <Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontFamily: "MontserratSemiBold" }}> Shipping</Text>
            <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
              {shipping}
            </ListItem.Title>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "MontserratSemiBold" }}> Total</Text>
            <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
              {totalPaid}
            </ListItem.Title>
          </View>
        </Card>
      </View>

      <View style={{ flex: 0.25 }}>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => createTwoButtonAlert()}
            loading={loading3}
            title="DECLINE"
            buttonStyle={{
              backgroundColor: "rgba(39, 39, 39, 1)",
              height: 80,
            }}
            containerStyle={{
              width: 250,
              marginHorizontal: 30,
              marginVertical: 10,
            }}
            titleStyle={{
              color: "white",
              marginHorizontal: 20,
              fontWeight: "900",
              fontSize: 19,
            }}
          />
          <Button
            onPress={() => buttonAlert2()}
            loading={loading2}
            title="READY FOR PICKUP"
            buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)", height: 80 }}
            containerStyle={{
              width: 250,
              marginHorizontal: 30,
              marginVertical: 10,
            }}
            titleStyle={{
              color: "white",
              marginHorizontal: 20,
              fontWeight: "900",
              fontSize: 19,
            }}
          />
          <Button
            onPress={() => buttonAlert3()}
            loading={loading1}
            title="CONFIRM"
            buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)", height: 80 }}
            containerStyle={{
              width: 250,
              marginHorizontal: 30,
              marginVertical: 10,
            }}
            titleStyle={{
              color: "white",
              marginHorizontal: 20,
              fontWeight: "900",
              fontSize: 20,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailedOrder;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
