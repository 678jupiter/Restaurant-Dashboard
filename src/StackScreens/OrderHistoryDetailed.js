import { StyleSheet, Text, View } from "react-native";
import React from "react";

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
  } = route.params;
  return (
    <View>
      <Text>OrderHistoryDetailed</Text>
    </View>
  );
};

export default OrderHistoryDetailed;

const styles = StyleSheet.create({});
