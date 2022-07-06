import React from "react";
import { View, ScrollView, Pressable, StyleSheet, Image } from "react-native";
import { Text, Card, Button, Icon, ListItem } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { format } from "timeago.js";

const OrderHistoryDetailed = ({ route }) => {
  const {
    address,
    amount,
    customermobilenumber,
    courierName,
    dishes,
    mpesaReceiptNumber,
    status,
    createdAt,
    userName,
    Oid,
    orderNumber,
    totalPaid,
    shipping,
  } = route.params;
  console.log(dishes);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.08 }}>
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
                {format(createdAt)}
              </ListItem.Title>
              <ListItem.Subtitle style={{ fontFamily: "MontserratSemiBold" }}>
                {address}
              </ListItem.Subtitle>
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
      <View style={{ flex: 0.62 }}>
        <ScrollView
          style={{ backgroundColor: "white", flex: 1, marginTop: 20 }}
        >
          <Text style={{ marginLeft: 16, fontSize: 18 }}>
            {dishes.length} Items
          </Text>

          {dishes.map((item, i) => (
            <Card key={i}>
              <ListItem.Content style={{}}>
                <View style={{ flexDirection: "row" }}>
                  <ListItem.Title
                    style={{ fontFamily: "MontserratSemiBold", fontSize: 20 }}
                  >
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
                    <ListItem.Title
                      style={{ fontFamily: "MontserratSemiBold" }}
                    >
                      Ksh {""}
                      {item.attributes.dishPrice * item.attributes.quantity}
                    </ListItem.Title>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        marginRight: 82,
                        fontFamily: "MontserratSemiBold",
                      }}
                    >
                      VAT
                    </Text>
                    <ListItem.Title
                      style={{ fontFamily: "MontserratSemiBold" }}
                    >
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
      </View>

      <View style={{ flex: 0.3 }}>
        <Card>
          <View style={{ height: "100%" }}>
            <View>
              <Text style={{ fontFamily: "MontserratSemiBold", fontSize: 25 }}>
                Paid
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontFamily: "MontserratSemiBold" }}>Subtotal</Text>

              <Text style={{ fontFamily: "MontserratSemiBold" }}>
                KSH 392929
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontFamily: "MontserratSemiBold" }}>Shipping</Text>
              <Text style={{ fontFamily: "MontserratSemiBold" }}>
                KSH {shipping}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: "MontserratSemiBold" }}>Total</Text>
              <Text style={{ fontFamily: "MontserratSemiBold" }}>KSH 2000</Text>
            </View>
            <Card.Divider />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontFamily: "MontserratSemiBold" }}>
                Paid by Customer
              </Text>
              <Text style={{ fontFamily: "MontserratSemiBold" }}>
                KES {totalPaid}
              </Text>
            </View>
          </View>
        </Card>
      </View>
      {/* <View style={{ flex: 0.2, height: "100%" }}>
        <Card></Card>
      </View> */}
    </View>
  );
};

export default OrderHistoryDetailed;

const styles = StyleSheet.create({});
