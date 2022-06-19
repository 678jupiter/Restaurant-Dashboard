import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Icon, ListItem } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../config";
import call from "react-native-phone-call";
import { Card } from "@rneui/base";

const ReadyForPickUpDetailed = ({ navigation, route }) => {
  const {
    totalPaid,
    createdAt,
    dish,
    orderNumber,
    status,
    userName,
    orderId,
    address,
    customermobilenumber,
    shipping,
  } = route.params;
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{userName}</ListItem.Title>
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

          <Text>{customermobilenumber}</Text>
          <ListItem.Content>
            <View
              style={{
                alignSelf: "flex-end",
              }}
            >
              <ListItem.Title>{createdAt}</ListItem.Title>
              <ListItem.Subtitle>{address}</ListItem.Subtitle>
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
      <ScrollView style={{ backgroundColor: "white", flex: 1, marginTop: 20 }}>
        {dish.map((item, i) => (
          <Card key={i}>
            <ListItem.Content key={i} style={{}}>
              <View style={{ flexDirection: "row" }}>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle style={{ marginLeft: 30 }}>
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
                  <Text style={{ marginRight: 50 }}>Subtotal</Text>
                  <ListItem.Title>
                    Ksh {""}
                    {item.price * item.quantity}
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
            <Text style={{}}> Shipping</Text>
            <ListItem.Title>{shipping}</ListItem.Title>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{}}> Total</Text>
            <ListItem.Title>{totalPaid}</ListItem.Title>
          </View>
        </Card>
      </View>

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
