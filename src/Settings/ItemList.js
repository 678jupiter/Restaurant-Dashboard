import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { Switch } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Redux/itemsActions";
import { BASEURL } from "../config";
import axios from "axios";

const ItemList = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let isCancelled = false;
    dispatch(fetchItems());
    return () => {
      isCancelled = true;
    };
  }, [dispatch]);

  const itemsList = useSelector((state) => state.items.restaurantDishes);
  //console.log(itemsList);

  if (itemsList.length === 0) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.colors} />
      </View>
    );
  }

  if (itemsList.length !== 0) {
    return (
      <View>
        <ScrollView>
          {itemsList?.data?.map((l, i) => (
            <ListItem
              key={i}
              bottomDivider
              onPress={() =>
                navigation.navigate("editDish", {
                  Pname: l.attributes.name,
                  Pdescription: l.attributes.description,
                  Pprice: l.attributes.price,
                  Pimage: l.attributes.image,
                  Ptax: l.attributes.Tax,
                  dId: l.id,
                })
              }
            >
              <Avatar source={{ uri: `${BASEURL}${l.attributes.image}` }} />
              <ListItem.Content>
                <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
                  {l.attributes.name}
                </ListItem.Title>
                <ListItem.Subtitle>
                  {l.attributes.description}
                </ListItem.Subtitle>
              </ListItem.Content>
              {l.attributes.dishVisibility === false ? (
                <Switch
                  value={l.attributes.dishVisibility}
                  onValueChange={() => {
                    axios
                      .put(`http://localhost:1337/api/dishes/${l.id}`, {
                        data: {
                          dishVisibility: true,
                        },
                      })
                      .then(function (response) {
                        dispatch(fetchItems());
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }}
                />
              ) : (
                <Switch
                  value={l.attributes.dishVisibility}
                  onValueChange={() => {
                    axios
                      .put(`http://localhost:1337/api/dishes/${l.id}`, {
                        data: {
                          dishVisibility: false,
                        },
                      })
                      .then(function (response) {
                        dispatch(fetchItems());
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }}
                />
              )}
            </ListItem>
          ))}
        </ScrollView>
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
        <Text style={{ color: "white", fontSize: 40 }}>No Items.</Text>
      </View>
    );
  }
};

export default ItemList;

const styles = StyleSheet.create({});
