import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { Switch } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartegories } from "../Redux/cartegoryActions";
import { BASEURL } from "../config";

const Cartegories = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let isCancelled = false;
    dispatch(fetchCartegories());
    return () => {
      isCancelled = true;
    };
  }, [dispatch]);

  const cartegoriesList = useSelector(
    (state) => state.cartegories.restaurantCartegories
  );
  if (cartegoriesList.length === 0) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.colors} />
      </View>
    );
  }

  if (cartegoriesList.length !== 0) {
    return (
      <View style={{ paddingTop: 20 }}>
        <View>
          {cartegoriesList?.data?.map((l, i) => (
            <ListItem
              key={i}
              bottomDivider
              onPress={() =>
                navigation.navigate("editCartegory", {
                  Cname: l.attributes.name,
                  img: l.attributes.image,
                  cId: l.id,
                })
              }
            >
              <Avatar source={{ uri: `${BASEURL}${l.attributes.image}` }} />
              <ListItem.Content>
                <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
                  {l.attributes.name}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "rgba(39, 39, 39, 1)",
          paddingTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 40 }}>No Cartegories.</Text>
      </View>
    );
  }
};

export default Cartegories;

const styles = StyleSheet.create({
  iconBackContainer: {
    // backgroundColor: "red",
    left: -10,
  },
});
