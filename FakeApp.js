import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import io from "socket.io-client";
import * as Notifications from "expo-notifications";

const FakeApp = () => {
  const socket = io("https://socketitisha.herokuapp.com");
  function showRoom() {
    console.log("Joined Room");
  }
  // recieving instructions from my backend
  useEffect(() => {
    let isCancelled = false;
    const hookup = async () => {
      const input = "orders_room";
      socket.emit("enter_new_order", input, showRoom);
    };
    hookup();
    return () => {
      isCancelled = true;
    };
  }, []);
  function addMessage(message) {
    console.log(message);
  }
  socket.on("new_placed_orders", addMessage);

  function dismissNotification() {}

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Button
        title="Dismiss"
        onPress={() => Notifications.cancelAllScheduledNotificationsAsync()}
      />
    </SafeAreaView>
  );
};

export default FakeApp;

const styles = StyleSheet.create({});
