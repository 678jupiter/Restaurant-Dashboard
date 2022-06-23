import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// axios.get(url,{
// headers:{
// Accept: 'application/json
// }
//})
// axios.post(url,{data},{
// headers:{}
//})

const Autht = () => {
  const userData = useSelector((state) => state.user.usermeta);
  const authAxios = axios.create({
    baseURL: "http://localhost:1337/api/",
    headers: {
      Authorization: `Bearer ${userData.jwt}`,
    },
  });

  const ReadyForPickUp = async () => {
    await authAxios
      .put(`restaurant-orders/75`, {
        data: {
          status: "Ready",
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={() => ReadyForPickUp()} title="API" />
    </View>
  );
};

export default Autht;

const styles = StyleSheet.create({});
