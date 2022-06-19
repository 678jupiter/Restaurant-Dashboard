import React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";

const OrderHistoryDetailed = ({ route }) => {
  const {
    address,
    amount,
    customermobilenumber,
    courierName,
    dishes,
    mpesaReceiptNumber,
    status,
    userName,
    Oid,
    totalPaid,
    shipping,
  } = route.params;
  console.log(dishes);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.3 }}>
        <Card>
          {dishes?.map((l, i) => (
            <ScrollView key={i}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  height: "100%",
                  alignContent: "space-around",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ width: "50%", fontFamily: "MontserratSemiBold" }}
                >
                  {l.name}
                </Text>
                <Text
                  style={{ width: "10%", fontFamily: "MontserratSemiBold" }}
                >
                  KES {""}
                  {l.price}
                </Text>
                <Text
                  style={{ width: "10%", fontFamily: "MontserratSemiBold" }}
                >
                  X {""}
                  {l.quantity}
                </Text>
                <Text
                  style={{ width: "10%", fontFamily: "MontserratSemiBold" }}
                >
                  KES {""}
                  {l.price * l.quantity}
                </Text>
                <Card.Divider />
              </View>
            </ScrollView>
          ))}
        </Card>
      </View>

      <View style={{ flex: 0.5 }}>
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
      <View style={{ flex: 0.2, height: "100%" }}>
        <Card></Card>
      </View>
    </View>
  );
};

export default OrderHistoryDetailed;

const styles = StyleSheet.create({});
