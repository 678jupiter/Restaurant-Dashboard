import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ListItem, Avatar } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const Conversation = ({ conversation }) => {
  console.log(conversation);

  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const userData = useSelector((state) => state.user.usermeta);
  useEffect(() => {
    const friendId = conversation?.members.find((m) => m != userData.id);
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1337/api/users/${friendId}`
        );
        setUser(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log("There was an error getting the user id" + error);
      }
    };
    getUser();
  }, [userData.id, conversation]);

  return (
    <View>
      <ListItem
        bottomDivider
        onPress={() =>
          navigation.navigate("chatScreen", {
            currentChat: conversation,
          })
        }
        // onPress={() => console.log(conversation)}
      >
        <Avatar
          avatarStyle={{ borderRadius: 24, aspectRatio: 1 }}
          size="medium"
          source={{
            uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
          }}
        />
        <ListItem.Content>
          <ListItem.Title>{user?.username}</ListItem.Title>
          <ListItem.Subtitle numberOfLines={1}>mgs</ListItem.Subtitle>
          <ListItem.Subtitle
            style={{ alignSelf: "flex-end", justifyContent: "flex-end" }}
            numberOfLines={1}
          >
            l.times
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default Conversation;

const styles = StyleSheet.create({});