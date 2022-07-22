import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Card, ListItem } from "@rneui/themed";
import { Button, Icon } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchOrders } from "../Redux/orderActions";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import call from "react-native-phone-call";
import { format } from "timeago.js";
import { dfhs } from "@env";

const InProgressDetailed = ({ navigation, route }) => {
  const {
    username,
    dish,
    orderNumber,
    orderId,
    createdAt,
    customermobilenumber,
    address,
    shipping,
    totalPaid,
  } = route.params;

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state.user.usermeta);
  const authAxios = axios.create({
    baseURL: `${dfhs}`,
    headers: {
      Authorization: `Bearer ${userData.jwt}`,
    },
  });
  const ReadyForPickUp = async () => {
    setLoading(true);
    await authAxios
      .put(`restaurant-orders/${orderId}`, {
        data: {
          status: "Ready",
        },
      })
      .then(function (response) {
        dispatch(fetchOrders());
        setLoading(false);
        navigation.navigate("Order Ready For PickUp");
        //  setDeliveryStatus(ORDER_STATUSES.ACCEPTED);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };
  const buttonAlert = () =>
    Alert.alert(`${username}'s Order`, `is ReadyForPickUp`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => ReadyForPickUp() },
    ]);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
              {username}
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
                {format(createdAt)}
              </ListItem.Title>
              <ListItem.Subtitle style={{ fontFamily: "MontserratSemiBold" }}>
                {address}
              </ListItem.Subtitle>
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
      <ScrollView style={{ backgroundColor: "white", flex: 1, marginTop: 20 }}>
        <Text style={{ marginLeft: 16, fontSize: 18 }}>
          {dish.length} Items
        </Text>
        {dish.map((item, i) => (
          <Card key={i}>
            <ListItem.Content key={i} style={{}}>
              <View style={{ flexDirection: "row" }}>
                <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
                  {item.attributes.dishName}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{ marginLeft: 30, fontFamily: "MontserratSemiBold" }}
                >
                  x {item.attributes.quantity}
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
                    {item.attributes.dishPrice * item.attributes.quantity}
                  </ListItem.Title>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      marginRight: 82,
                      fontFamily: "MontserratSemiBold",
                    }}
                  >
                    VAT
                  </Text>
                  <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
                    Ksh {""}
                    VAT
                    {/* {item.tax} */}
                  </ListItem.Title>
                </View>
              </View>
            </ListItem.Content>
            <Text
              style={{
                alignSelf: "flex-start",
                backgroundColor: "yellow",
                maxHeight: 100,
                maxWidth: "50%",
                fontSize: 18,
              }}
            >
              {item.attributes.SpecialInstructions}
            </Text>
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
      <View style={{ backgroundColor: "white", flex: 0.4 }}>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => buttonAlert()}
            loading={loading}
            title="READY FOR PICKUP"
            buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)", height: 80 }}
            containerStyle={{
              width: 800,
              marginHorizontal: 10,
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

export default InProgressDetailed;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 40,
  },
});
