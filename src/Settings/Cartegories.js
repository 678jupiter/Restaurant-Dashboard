import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { Switch } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartegories } from "../Redux/cartegoryActions";
import { BASEURL } from "../config";

const Cartegories = () => {
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
  console.log(cartegoriesList);

  return (
    <View style={{ paddingTop: 20 }}>
      <View>
        {cartegoriesList.data.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{ uri: `${BASEURL}${l.attributes.image}` }} />
            <ListItem.Content>
              <ListItem.Title>{l.attributes.name}</ListItem.Title>
              <ListItem.Subtitle>{l.attributes.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
};

export default Cartegories;

const styles = StyleSheet.create({
  iconBackContainer: {
    // backgroundColor: "red",
    left: -10,
  },
});
