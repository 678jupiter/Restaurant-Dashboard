import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ListItem, Avatar, SearchBar } from "@rneui/themed";
import { Switch } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartegories } from "../Redux/cartegoryActions";
import { BASEURL, colors } from "../config";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

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
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState();
  const [masterDataSource, setMasterDataSource] = useState();
  const [selected, SetSelected] = useState();
  const uri = `http://localhost:1337/api/restaurants/?populate=*`;

  useFocusEffect(
    React.useCallback(() => {
      let isCancelled = false;
      const result = async () => {
        await axios
          .get(uri)
          .then(function (res) {
            // handle success

            setFilteredDataSource(res.data);
            setMasterDataSource(res.data);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      };
      result();
      return () => {
        isCancelled = true;
      };
    }, [])
  );

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource?.data?.filter(function (dish) {
        const itemData = dish.attributes.name
          ? dish.attributes.name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      SetSelected(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  if (cartegoriesList.length === 0) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.light_gray} />
      </View>
    );
  }

  if (cartegoriesList.length !== 0) {
    return (
      <View style={{ paddingTop: 20 }}>
        <SearchBar
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          placeholder="Search Here..."
          value={search}
          containerStyle={{
            backgroundColor: "#fff",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
          inputContainerStyle={{ backgroundColor: "#F5F5F5" }}
          lightTheme={true}
        />
        <ScrollView>
          {filteredDataSource?.data?.map((l, i) => (
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
        </ScrollView>

        <ScrollView>
          {selected?.map((l, i) => (
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
