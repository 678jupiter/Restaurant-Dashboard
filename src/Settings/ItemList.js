import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar, SearchBar } from "@rneui/themed";
import { Switch } from "@rneui/themed";
import { dfhs } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Redux/itemsActions";
import { BASEURL, colors } from "../config";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

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
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState();
  const [masterDataSource, setMasterDataSource] = useState();
  const [selected, SetSelected] = useState();
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state.user.usermeta);
  const authAxios = axios.create({
    baseURL: `${dfhs}`,
    headers: {
      Authorization: `Bearer ${userData.jwt}`,
    },
  });

  const getDishes = async () => {
    setFilteredDataSource(null);
    setMasterDataSource(null);
    setLoading(true);
    await axios
      .get(`${dfhs}dishes/?populate=*`)
      .then(function (res) {
        setFilteredDataSource(res.data);
        setMasterDataSource(res.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        if (error.message === "Network request failed") {
          console.log("good error");

          Alert.alert("Opps. Your device is not connected to the Internet");
        }
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      let isCancelled = false;
      const result = async () => {
        setLoading(true);
        await axios
          .get(`${dfhs}dishes/?populate=*`)
          .then(function (res) {
            setFilteredDataSource(res.data);
            setMasterDataSource(res.data);
            setLoading(false);
          })
          .catch(function (error) {
            setLoading(false);

            console.log(error.message);
            if (error.message === "Network request failed") {
              console.log("good error");

              Alert.alert("Opps. Your device is not connected to the Internet");
            }
            if (error.message === "Network Error") {
              console.log("good error");

              Alert.alert("Opps. Your device is not connected to the Internet");
            }
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

  if (itemsList.length === 0) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.light_gray} />
      </View>
    );
  }
  if (loading === true) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      </SafeAreaView>
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
            height: 50,
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
            justifyContent: "center",
          }}
          inputContainerStyle={{ backgroundColor: "#F5F5F5", height: 40 }}
          lightTheme={true}
        />
        <ScrollView>
          {filteredDataSource?.data?.map((l, i) => (
            <ListItem
              containerStyle={{ height: 60 }}
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
                      .put(`dishes/${l.id}`, {
                        data: {
                          dishVisibility: true,
                        },
                      })
                      .then(function (response) {
                        dispatch(fetchItems());
                        getDishes();
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
                      .put(`dishes/${l.id}`, {
                        data: {
                          dishVisibility: false,
                        },
                      })
                      .then(function (response) {
                        dispatch(fetchItems());
                        getDishes();
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
          <View style={{ height: 60 }}></View>
        </ScrollView>
        <ScrollView>
          {selected?.map((l, i) => (
            <ListItem
              containerStyle={{ height: 60 }}
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
                      .put(`dishes/${l.id}`, {
                        data: {
                          dishVisibility: true,
                        },
                      })
                      .then(function (response) {
                        dispatch(fetchItems());
                        getDishes();
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
                      .put(`dishes/${l.id}`, {
                        data: {
                          dishVisibility: false,
                        },
                      })
                      .then(function (response) {
                        dispatch(fetchItems());
                        getDishes();
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
          <View style={{ height: 60 }}></View>
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
