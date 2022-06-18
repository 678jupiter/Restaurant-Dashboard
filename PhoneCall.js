import { StyleSheet, Text, View } from "react-native";
import React from "react";
import call from "react-native-phone-call";

const PhoneCall = () => {
  const args = {
    number: "0701626345",
    prompt: false,
  };
  function makeCall() {
    call(args).catch(console.error);
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text onPress={() => makeCall()}>PhoneCall</Text>
    </View>
  );
};

export default PhoneCall;
