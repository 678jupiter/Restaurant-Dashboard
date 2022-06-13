import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { Switch } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Redux/itemsActions";
import { BASEURL } from "../config";

const ItemList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let isCancelled = false;
    dispatch(fetchItems());
    return () => {
      isCancelled = true;
    };
  }, [dispatch]);

  const itemsList = useSelector((state) => state.items.restaurantDishes);
  console.log(itemsList);

  const [checked, setChecked] = useState(false);
  const SwitchComponent = () => {
    const [checked, setChecked] = useState(false);

    const toggleSwitch = () => {
      setChecked(!checked);
    };
  };

  return (
    <View>
      <ScrollView>
        {itemsList.data.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{ uri: `${BASEURL}${l.attributes.image}` }} />
            <ListItem.Content>
              <ListItem.Title>{l.attributes.name}</ListItem.Title>
              <ListItem.Subtitle>{l.attributes.description}</ListItem.Subtitle>
            </ListItem.Content>
            <Switch
              value={checked}
              onValueChange={(value) => setChecked(value)}
            />
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
};

export default ItemList;

const styles = StyleSheet.create({});
