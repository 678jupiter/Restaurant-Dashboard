import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native";

const EditName = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>EditName</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
};

export default EditName;

const styles = StyleSheet.create({});
