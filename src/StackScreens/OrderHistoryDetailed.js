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
            <ScrollView>
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  height: "100%",
                  alignContent: "space-around",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>{l.name}</Text>
                <Text style={{ width: "10%" }}>
                  KES {""}
                  {l.price}
                </Text>
                <Text style={{ width: "10%" }}>
                  X {""}
                  {l.quantity}
                </Text>
                <Text style={{ width: "10%" }}>
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
              <Text>Paid</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Subtotal</Text>

              <Text>KSH 392929</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Shipping</Text>
              <Text>KSH {shipping}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Total</Text>
              <Text>KSH 2000</Text>
            </View>
            <Card.Divider />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Paid by Customer</Text>
              <Text>KES {totalPaid}</Text>
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
