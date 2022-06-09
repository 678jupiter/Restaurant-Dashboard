import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Icon } from "@rneui/themed";

const list = [
  {
    icon: "done",
    status: "completed",
    customer: "Jane Junior",
    order: "FDFWQIERU",
    paid: "12345",
  },
  {
    icon: "done",
    status: "completed",
    customer: "Jane",
    order: "FDFWQIERU",
    paid: "12345",
  },
];

const OrderHistoryScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        // marginRight: 30,
        // marginBottom: 30,
        // marginLeft: 30,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          flex: 0.08,
          justifyContent: "center",
          paddingRight: 10,
          paddingLeft: 10,
        }}
      >
        <Text>OrderHistory</Text>
      </View>

      <View>
        <ListItem bottomDivider containerStyle={{ backgroundColor: "#edeff0" }}>
          <ListItem.Title style={{ marginRight: 20, marginLeft: 40 }}>
            status
          </ListItem.Title>
          <ListItem.Content
            style={{
              // alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <ListItem.Title style={{ marginLeft: 40 }}>order</ListItem.Title>

            <ListItem.Title>Customer</ListItem.Title>
            <ListItem.Title style={{ marginRight: 40 }}>Paid</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        {list.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <Icon
              color="white"
              size={22}
              name={item.icon}
              style={{ backgroundColor: "green", borderRadius: 10 }}
            />
            <ListItem.Title style={{ marginRight: 20 }}>
              {item.status}
            </ListItem.Title>
            <ListItem.Content
              style={{
                // alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <ListItem.Title>{item.order}</ListItem.Title>

              <ListItem.Title>{item.customer}</ListItem.Title>
              <ListItem.Title>
                Ksh {""}
                {item.paid}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </View>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({});
