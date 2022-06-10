import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "@rneui/themed";

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    lastMessage: "add a banana",
    times: "1:00 am",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    lastMessage:
      "add extra source add extra source add extra source add extra source add extra source add extra source add extra source ",
    times: "30/05/2022",
  },
];

const ChartList = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        {list.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => navigation.navigate("chatScreen")}
          >
            <Avatar
              avatarStyle={{ borderRadius: 24, aspectRatio: 1 }}
              size="medium"
              source={{ uri: l.avatar_url }}
            />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle numberOfLines={1}>
                {l.lastMessage}
              </ListItem.Subtitle>
              <ListItem.Subtitle
                style={{ alignSelf: "flex-end", justifyContent: "flex-end" }}
                numberOfLines={1}
              >
                {l.times}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
};

export default ChartList;

const styles = StyleSheet.create({});
