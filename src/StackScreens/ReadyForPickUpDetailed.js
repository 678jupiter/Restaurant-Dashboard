import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ListItem } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../config";
import call from "react-native-phone-call";

const ReadyForPickUpDetailed = ({ navigation, route }) => {
  const {
    totalPaid,
    createdAt,
    dish,
    orderNumber,
    status,
    userName,
    orderId,
    customermobilenumber,
  } = route.params;
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{userName}</ListItem.Title>
            <ListItem.Subtitle>{orderNumber}</ListItem.Subtitle>
          </ListItem.Content>
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

      <View style={{ flex: 0.2 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            alignContent: "center",
            backgroundColor: colors.light_gray,
            marginLeft: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
              onPress={() =>
                call({ number: `${customermobilenumber}`, prompt: false })
              }
            >
              <Ionicons
                name="call-outline"
                size={40}
                color="black"
                style={{ marginRight: 10, padding: 10 }}
              />
            </Pressable>
            <Text>{userName}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReadyForPickUpDetailed;

const styles = StyleSheet.create({
  buttonsContainer: {},
});
