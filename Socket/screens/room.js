import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Room = () => {
  function addMessage(message) {
    console.log(message);
  }

  const socket = io("http://localhost:4000");
  useEffect(() => {
    socket.on("new_message", addMessage);
    socket.on("welcome", () => {
      console.log("welcome");
    });
  }, [socket]);

  return (
    <View>
      <Text>Room</Text>
    </View>
  );
};

export default Room;

const styles = StyleSheet.create({});
