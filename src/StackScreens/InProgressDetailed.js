import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Card, ListItem } from "@rneui/themed";
import { Button, Icon } from "@rneui/base";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchOrders } from "../Redux/orderActions";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import call from "react-native-phone-call";

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
  const ReadyForPickUp = async () => {
    setLoading(true);
    await axios
      .put(`http://localhost:1337/api/restaurant-orders/${orderId}`, {
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
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {/* <View>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{username}</ListItem.Title>
            <ListItem.Subtitle>{orderNumber}</ListItem.Subtitle>
          </ListItem.Content>
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

          <Text>{`${username}`}</Text>
          <ListItem.Content>
            <View
              style={{
                alignSelf: "flex-end",
              }}
            >
              <ListItem.Title>{cteatedAt}</ListItem.Title>
              <ListItem.Subtitle>15 min</ListItem.Subtitle>
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
      <ScrollView style={{ backgroundColor: "white", flex: 1, marginTop: 20 }}>
        {dish.map((item, i) => (
          <ListItem.Content key={i} style={{}}>
            <View style={{ flexDirection: "row" }}>
              <ListItem.Subtitle style={{ marginLeft: 30 }}>
                {item.quantity}x
              </ListItem.Subtitle>
              <ListItem.Title style={{ marginLeft: 30 }}>
                {item.name}
              </ListItem.Title>
            </View>

            <View style={{ alignSelf: "flex-end", marginRight: 150 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 50 }}>Subtotal</Text>
                <ListItem.Title>
                  Ksh {""}
                  {item.price}
                </ListItem.Title>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 82 }}>Tax</Text>
                <ListItem.Title>
                  Ksh {""}
                  .tax
                </ListItem.Title>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 75 }}>Total</Text>
                <ListItem.Title>
                  Ksh {""}
                  {item.price}
                </ListItem.Title>
              </View>
            </View>
          </ListItem.Content>
        ))}
      </ScrollView> */}
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
            <ListItem.Content key={i} style={{}}>
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
      <View style={{ backgroundColor: "white", flex: 0.4 }}>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => ReadyForPickUp()}
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
