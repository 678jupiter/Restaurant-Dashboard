import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import call from "react-native-phone-call";

const ReadyForPickUp = ({ navigation }) => {
  const [courierLoading, setCourierLoading] = useState(false);
  const [couries, setCouriers] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [featured, setFeatured] = useState(null);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   let isCancelled = false;
  //   dispatch(fetchOrders());
  //   return () => {
  //     isCancelled = true;
  //   };
  // }, [dispatch]);

  const getCouriers = () => {
    setCourierLoading(true);
    axios
      .get("https://myfoodcms189.herokuapp.com/api/couriers")
      .then((res) => {
        setCourierLoading(false);
        const { data } = res.data;
        console.log(data);
        setCouriers(data);
      })
      .catch((error) => {
        setCourierLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    getCouriers();
  }, []);

  const restaurantOrders = useSelector(
    (state) => state.orders.restaurantOrders
  );
  if (restaurantOrders.length === 0) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.colors} />
      </View>
    );
  }
  const i = restaurantOrders.data;
  const result = i.filter((item) => item.attributes.status === "Ready");
  //console.log(result);
  if (result.length !== 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(39, 39, 39, 1)",
          // paddingTop: 20,
        }}
      >
        <View
          style={{
            marginLeft: 100,
            marginRight: 100,
            flex: 0.07,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Ready</Text>
        </View>
        <View style={{ flex: 0.78 }}>
          <ScrollView
            style={{
              marginTop: 10,
              marginLeft: 100,
              marginRight: 100,
              flex: 0.8,
            }}
          >
            {result.map((l, i) => (
              <View key={i} style={{ height: 50 }}>
                <TouchableOpacity
                  style={{ backgroundColor: "white", flex: 1 }}
                  key={i}
                  onPress={() =>
                    navigation.navigate("readyForPickUpDetailed", {
                      userName: `${l.attributes.userName}`,
                      dish: l.attributes.dishes,
                      orderNumber: `${l.attributes.mpesaReceiptNumber}`,
                      orderId: l.id,
                      customermobilenumber: l.attributes.customermobilenumber,
                      shipping: l.attributes.shipping,
                      createdAt: l.attributes.createdAt,
                      address: l.attributes.address,
                      status: l.attributes.status,
                      totalPaid: l.attributes.totalPaid,
                      methodofPayment: l.attributes.methodOfPayment,
                      methodofDelivery: l.attributes.methodOfDelivery,
                      verificationMessage: l.attributes.verificationMessage,
                    })
                  }
                  //onPress={() => console.log(l)}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginTop: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        marginLeft: 10,
                      }}
                    >
                      {l.attributes.userName}
                    </Text>
                    <Text style={{ marginRight: 10 }}>
                      {l.attributes.status}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      //  marginTop: 6,
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: 10,
                        paddingBottom: 10,
                        fontSize: 10,
                      }}
                    >
                      {l.attributes.mpesaReceiptNumber}
                    </Text>
                    <Text
                      style={{
                        marginRight: 10,
                        paddingBottom: 10,
                        fontSize: 10,
                      }}
                    >
                      {format(l.attributes.publishedAt)}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{ margin: 6, backgroundColor: "rgba(39, 39, 39, 1)" }}
                ></View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ flex: 0.3 }}>
          {courierLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", marginRight: 10 }}>
                  Loading couriers
                </Text>

                <ActivityIndicator color="white" size="large" />
              </View>
            </View>
          ) : (
            <ScrollView
              horizontal
              contentContainerStyle={{ backgroundColor: "white" }}
            >
              {couries?.map((item, i) => (
                <Pressable
                  key={i}
                  onPress={() => setFeatured(item) || setModalVisible(true)}
                >
                  <View
                    style={{
                      width: 80,
                      marginLeft: 2,
                      alignItems: "center",
                    }}
                  >
                    {item.attributes.active === true ? (
                      <View
                        style={{
                          backgroundColor: "green",
                          height: 10,
                          width: 10,
                          borderRadius: 10,
                          alignSelf: "flex-end",
                          marginRight: 4,
                          marginTop: 2,
                        }}
                      ></View>
                    ) : (
                      <View
                        style={{
                          backgroundColor: "black",
                          height: 10,
                          width: 10,
                          borderRadius: 10,
                          alignSelf: "flex-end",
                          marginRight: 4,
                          marginTop: 2,
                        }}
                      ></View>
                    )}

                    <Text style={{}}>{item.attributes.firstName}</Text>
                    <View
                      style={{
                        height: 100,
                        width: 100,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{
                          width: "20%",
                          height: "60%",
                          aspectRatio: 1,
                          borderRadius: 10,
                        }}
                        resizeMode="contain"
                        source={{
                          uri: `${item.attributes.image}`,
                        }}
                      />
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ alignContent: "center" }}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <AntDesign
                    name="close"
                    size={24}
                    color="black"
                    style={{
                      marginLeft: 20,
                      marginTop: 15,
                      alignSelf: "flex-start",
                    }}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: "yellow",
                  // justifyContent: "center",
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text style={styles.modalText}>
                    {featured?.attributes.firstName}{" "}
                    {featured?.attributes.secondName}
                  </Text>
                  {featured?.attributes.active === true ? (
                    <Text
                      style={{
                        color: "green",
                        marginBottom: 15,
                        textAlign: "center",
                      }}
                    >
                      Active
                    </Text>
                  ) : (
                    <Text style={styles.modalText}>Not Active</Text>
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Pressable
                      onPress={() =>
                        call({
                          number: `${featured?.attributes.mobileNumber}`,
                          prompt: false,
                        })
                      }
                      style={{ marginBottom: 20, marginRight: 20 }}
                    >
                      <Ionicons
                        onPress={() =>
                          call({
                            number: `${featured?.attributes.mobileNumber}`,
                            prompt: false,
                          })
                        }
                        name="call-outline"
                        size={28}
                        color="green"
                      />
                    </Pressable>
                    <Text style={styles.modalText}>
                      {featured?.attributes.mobileNumber}
                    </Text>
                  </View>

                  <Text style={styles.modalText}>
                    {featured.attributes.distanceFromRestaurant} KM away
                  </Text>
                </View>
                <View
                  style={{
                    width: "50%",
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{
                      width: "20%",
                      height: "60%",
                      aspectRatio: 1,
                      borderRadius: 10,
                    }}
                    resizeMode="contain"
                    source={{
                      uri: `${featured?.attributes.image}`,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
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
        <Text style={{ color: "white", fontSize: 30 }}>No Ready Orders.</Text>
      </View>
    );
  }
};

export default ReadyForPickUp;

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: "column",
    alignSelf: "flex-end",
    justifyContent: "center",
    alignContent: "flex-end",
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //  marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    height: "80%",
    width: "80%",
    //padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
