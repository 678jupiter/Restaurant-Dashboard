import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ListItem } from "@rneui/themed";
import { Button, Icon } from "@rneui/base";

const ReadyForPickUpDetailed = ({ navigation, route }) => {
  const { totalPaid, createdAt, dish, orderNumber, status, userName, orderId } =
    route.params;
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

      <View
        style={{
          alignItems: "flex-start",
        }}
      ></View>
      <View style={{ flex: 0.25 }}>
        <View style={styles.buttonsContainer}>
          {status === "Delivering" ? (
            <Button
              title="Track Order"
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
          ) : null}
          {/* <Button
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
          /> */}
        </View>
      </View>
    </View>
  );
};

export default ReadyForPickUpDetailed;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
