import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar, SearchBar } from "@rneui/themed";
import { Switch } from "@rneui/themed";
import { dfhs } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Redux/itemsActions";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const SpecialOffers = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let isCancelled = false;
    dispatch(fetchItems());
    return () => {
      isCancelled = true;
    };
  }, [dispatch]);

  const userData = useSelector((state) => state.user.usermeta);
  const authAxios = axios.create({
    baseURL: `${dfhs}`,
    headers: {
      Authorization: `Bearer ${userData.jwt}`,
    },
  });

  const itemsList = useSelector((state) => state.items.restaurantDishes);
  //console.log(itemsList);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState();
  const [masterDataSource, setMasterDataSource] = useState();
  const [selected, SetSelected] = useState();

  const result = async () => {
    await authAxios
      .get(`special-offers/?populate=*`)
      .then(function (res) {
        // handle success
        setFilteredDataSource(res.data);
        setMasterDataSource(res.data);
      })
      .catch(function (error) {
        // handle error
        console.log("1");
        if (error.message === "Network Error") {
          Alert.alert(
            "Your device has no internet connection. Please connect and try again."
          );
        } else {
          console.log(error);
        }
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      let isCancelled = false;

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
        <SearchBar
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          placeholder="Search Here..."
          value={search}
          containerStyle={{
            backgroundColor: "#fff",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
            justifyContent: "center",
            height: 50,
          }}
          inputContainerStyle={{ backgroundColor: "#F5F5F5", height: 40 }}
          lightTheme={true}
        />
        <ScrollView>
          {filteredDataSource?.data?.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={{ height: 60 }}
              bottomDivider
              onPress={() =>
                navigation.navigate("editOffer", {
                  Pname: l.attributes.name,
                  Pdescription: l.attributes.description,
                  Pprice: l.attributes.price,
                  Pimage: l.attributes.image,
                  Ptax: l.attributes.Tax,
                  dId: l.id,
                })
              }
            >
              <Avatar source={{ uri: `${l.attributes.image}` }} />
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
                    authAxios
                      .put(`special-offers/${l.id}`, {
                        ///api/special-offers/:id
                        data: {
                          dishVisibility: true,
                        },
                      })
                      .then(function (response) {
                        result();
                      })
                      .catch(function (error) {
                        if (error.message === "Network Error") {
                          Alert.alert(
                            "Your device has no internet connection. Please connect and try again."
                          );
                        } else {
                          console.log(error);
                        }
                      });
                  }}
                />
              ) : (
                <Switch
                  value={l.attributes.dishVisibility}
                  onValueChange={() => {
                    authAxios
                      .put(`special-offers/${l.id}`, {
                        data: {
                          dishVisibility: false,
                        },
                      })
                      .then(function (response) {
                        result();
                      })
                      .catch(function (error) {
                        if (error.message === "Network Error") {
                          Alert.alert(
                            "Your device has no internet connection. Please connect and try again."
                          );
                        } else {
                          console.log(error);
                        }
                      });
                  }}
                />
              )}
            </ListItem>
          ))}
        </ScrollView>
        <ScrollView>
          {selected?.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={{ height: 60 }}
              bottomDivider
              // onPress={() =>
              //   navigation.navigate("editOffer", {
              //     Pname: l.attributes.name,
              //     Pdescription: l.attributes.description,
              //     Pprice: l.attributes.price,
              //     Pimage: l.attributes.image,
              //     Ptax: l.attributes.Tax,
              //     dId: l.id,
              //   })
              onPress={() => console.log(l)}
              //}
            >
              <Avatar source={{ uri: `${l.attributes.image}` }} />
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
                    authAxios
                      .put(`special-offers/${l.id}`, {
                        data: {
                          dishVisibility: true,
                        },
                      })
                      .then(function (response) {
                        dispatch(fetchItems());
                      })
                      .catch(function (error) {
                        if (error.message === "Network Error") {
                          Alert.alert(
                            "Your device has no internet connection. Please connect and try again."
                          );
                        } else {
                          console.log(error);
                        }
                      });
                  }}
                />
              ) : (
                <Switch
                  value={l.attributes.dishVisibility}
                  onValueChange={() => {
                    authAxios
                      .put(`special-offers/${l.id}`, {
                        data: {
                          dishVisibility: false,
                        },
                      })
                      .then(function (response) {
                        dispatch(fetchItems());
                      })
                      .catch(function (error) {
                        if (error.message === "Network Error") {
                          Alert.alert(
                            "Your device has no internet connection. Please connect and try again."
                          );
                        } else {
                          console.log(error);
                        }
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

export default SpecialOffers;

const styles = StyleSheet.create({});
