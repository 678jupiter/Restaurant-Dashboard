import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ListItem } from "@rneui/themed";
import { Button, Icon } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchOrders } from "../Redux/orderActions";
import { Pressable } from "react-native";
import call from "react-native-phone-call";

const DetailedOrder = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { userName, dish, orderNumber, orderId, customermobilenumber } =
    route.params;
  console.log(orderId);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
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
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{userName}</ListItem.Title>
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

          <Text>{customermobilenumber}</Text>
          <ListItem.Content>
            <View
              style={{
                alignSelf: "flex-end",
              }}
            >
              <ListItem.Title>Due at 5:37 PM</ListItem.Title>
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
                  tax
                  {/* {item.tax} */}
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
      </ScrollView>

      <View
        style={{
          alignItems: "flex-start",
        }}
      >
        <Button
          color="secondary"
          buttonStyle={{
            // backgroundColor: "rgba(39, 39, 39, 1)",
            height: 80,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 30,
            marginVertical: 10,
          }}
          titleStyle={{
            color: "white",
            marginHorizontal: 20,
            fontWeight: "900",
            fontSize: 19,
          }}
        >
          Message Amanda
          <Icon name="chat" color="white" size={40} />
        </Button>
      </View>
      <View style={{ flex: 0.25 }}>
        <View style={styles.buttonsContainer}>
          <Button
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
            onPress={() => ReadyForPickUp()}
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
            onPress={() => Cooking()}
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
