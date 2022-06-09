import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem } from "@rneui/themed";
import { Button, ButtonGroup, withTheme } from "@rneui/base";
const dishes = [
  {
    dishName: "Bacon Cheese burger",
    quantity: "1",
    paid: "10",
    tax: "0.83",
    status: "new",
  },
];

const DetailedOrder = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <View>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Amanda</ListItem.Title>
            <ListItem.Subtitle>FFDEAZL</ListItem.Subtitle>
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
      <View style={{ backgroundColor: "white", flex: 1 }}>
        {dishes.map((item, i) => (
          <ListItem.Content key={i} style={{}}>
            <View style={{ flexDirection: "row" }}>
              <ListItem.Subtitle style={{ marginLeft: 30 }}>
                {item.quantity}x
              </ListItem.Subtitle>
              <ListItem.Title style={{ marginLeft: 30 }}>
                {item.dishName}
              </ListItem.Title>
            </View>

            <View style={{ alignSelf: "flex-end", marginRight: 150 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 50 }}>Subtotal</Text>
                <ListItem.Title>
                  Ksh {""}
                  {item.paid}
                </ListItem.Title>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 82 }}>Tax</Text>
                <ListItem.Title>
                  Ksh {""}
                  {item.tax}
                </ListItem.Title>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 75 }}>Total</Text>
                <ListItem.Title>
                  Ksh {""}
                  {item.paid}
                </ListItem.Title>
              </View>
            </View>
          </ListItem.Content>
        ))}
      </View>
      <View style={{ backgroundColor: "white", flex: 0.4 }}>
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
    marginVertical: 40,
  },
});
