import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import io from "socket.io-client";

const Joinroom = ({ navigation }) => {
  function confrim() {
    console.log("In");
    navigation.navigate("room");
  }
  const submit = () => {
    const socket = io("http://localhost:4000");
    socket.emit("enter_room", "room_1", confrim);
    // clear chat message state
  };

  function addMessage(message) {
    console.log(message);
  }

  const socket = io("http://localhost:4000");
  socket.on("new_message", addMessage);
  socket.on("welcome", () => {
    console.log("welcome");
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Join Room" onPress={() => submit()}></Button>
    </View>
  );
};

export default Joinroom;

const styles = StyleSheet.create({});
