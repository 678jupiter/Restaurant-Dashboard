import {
  Alert,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Card, ListItem } from "@rneui/themed";
import { Button, Header, Icon } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../Redux/orderActions";
import { Pressable } from "react-native";
import call from "react-native-phone-call";
import { format } from "timeago.js";
import { AntDesign } from "@expo/vector-icons";
import { dfhs } from "@env";
import io from "socket.io-client";
import { Border } from "../../components";
import { colors } from "../config";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DetailedOrder = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [featured, setFeatured] = useState(null);

  const dispatch = useDispatch();
  const {
    userName,
    dish,
    orderNumber,
    orderId,
    customermobilenumber,
    status,
    totalPaid,
    address,
    createdAt,
    shipping,
    conversationId,
    methodofPayment,
    methodofDelivery,
    verificationMessage,
  } = route.params;
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const userData = useSelector((state) => state.user.usermeta);
  const authAxios = axios.create({
    baseURL: `${dfhs}`,
    headers: {
      Authorization: `Bearer ${userData.jwt}`,
    },
  });
  const socket = io("https://socketitisha.herokuapp.com");
  function showRoom() {
    console.log("Joined Room");
  }
  useEffect(() => {
    let isCancelled = false;
    const input = JSON.stringify(conversationId);
    const notInit = () => {
      socket.emit("enter_user_order_channel", input, showRoom);
    };
    notInit();
    return () => {
      isCancelled = true;
    };
  }, []);

  const clientNotification = () => {
    const input = JSON.stringify(conversationId);

    let roomName = input;

    const inputM = conversationId;
    socket.emit("order_status_change", inputM, roomName, () => {
      console.log("Just emitted");
    });
  };

  const sendConfirmationMessage = async () => {
    await axios
      .post(`https://msgintisha.herokuapp.com/api/messages`, {
        sender: userData.id,
        text: `Your order ${orderId} is being processed.`,
        conversationId: conversationId,
        user: {
          _id: userData.username,
          name: userData.username,
          avatar: "https://placeimg.com/140/140/any",
        },
      })
      .then((res) => {
        console.log("Message Sent");
      })
      .catch((error) => {
        console.log("message server");
      });
  };

  const Cooking = async () => {
    setLoading1(true);
    await authAxios
      .put(`restaurant-orders/${orderId}`, {
        data: {
          status: "Cooking",
        },
      })
      .then(function (response) {
        dispatch(fetchOrders());
        setLoading1(false);
        sendConfirmationMessage();
        clientNotification();
        navigation.navigate("Orders In Progress", {
          userName,
          dish,
          orderNumber,
          orderId,
        });
        //  setDeliveryStatus(ORDER_STATUSES.ACCEPTED);
      })
      .catch(function (error) {
        setLoading1(false);
        console.log(error);
        console.log("Str");
      });
  };
  const ReadyForPickUp = async () => {
    setLoading2(true);
    await authAxios
      .put(`restaurant-orders/${orderId}`, {
        data: {
          status: "Ready",
        },
      })
      .then(function (response) {
        dispatch(fetchOrders());
        setLoading2(false);
        navigation.navigate("Order Ready For PickUp", {
          userName,
          dish,
          orderNumber,
          orderId,
        });
        //  setDeliveryStatus(ORDER_STATUSES.ACCEPTED);
      })
      .catch(function (error) {
        setLoading2(false);
        console.log(error);
      });
  };
  const Decline = () => {
    setLoading3(true);

    authAxios
      .put(`restaurant-orders/${orderId}`, {
        data: {
          status: "Declined",
        },
      })
      .then(function (response) {
        setLoading3(false);
        navigation.navigate("Order History");
        dispatch(fetchOrders());
      })
      .catch(function (error) {
        setLoading3(false);
        console.log(error);
      });
  };
  const createTwoButtonAlert = () =>
    Alert.alert("Cancel", `${userName}'s Order`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => Decline() },
    ]);
  const buttonAlert2 = () =>
    Alert.alert(`${userName}'s Order`, `Is Ready For PickUp`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => ReadyForPickUp() },
    ]);

  const buttonAlert3 = () =>
    Alert.alert(`Accept`, `${userName}'s Order`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => Cooking() },
    ]);
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {/* {Header} */}
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
          alignContent: "center",
          width: windowWidth,
          flexDirection: "row",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            width: windowWidth / 2,
            justifyContent: "center",
            alignItems: "flex-start",
            alignContent: "center",
          }}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ alignSelf: "flex-start" }}
          >
            <Ionicons
              name="arrow-back-sharp"
              size={24}
              color="black"
              style={{ marginLeft: 10, marginTop: 25 }}
            />
          </Pressable>
        </View>
        <View
          style={{
            width: windowWidth / 2,
            justifyContent: "center",
            alignItems: "flex-end",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              marginTop: 30,
              marginRight: 20,
              color: "green",
              fontSize: 20,
            }}
          >
            {status}
          </Text>
        </View>
      </View>
      <ScrollView style={{ flex: 0.45, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.15, height: 50, justifyContent: "center" }}>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
                  {userName}
                </ListItem.Title>
                <ListItem.Subtitle>{orderNumber}</ListItem.Subtitle>
              </ListItem.Content>
              <Pressable onPress={() => navigation.navigate("chartList")}>
                <Icon
                  name="chat"
                  color="black"
                  size={20}
                  style={{ marginRight: 10, padding: 6 }}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  call({ number: `${customermobilenumber}`, prompt: false })
                }
              >
                <Ionicons
                  name="call-outline"
                  size={20}
                  color="black"
                  style={{ marginRight: 10, padding: 6 }}
                />
              </Pressable>

              <Text style={{ fontFamily: "MontserratSemiBold" }}>
                {customermobilenumber}
              </Text>
              <ListItem.Content>
                <View
                  style={{
                    alignSelf: "flex-end",
                  }}
                >
                  <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
                    {format(createdAt)}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={{ fontFamily: "MontserratSemiBold" }}
                  >
                    {address}
                  </ListItem.Subtitle>
                </View>
              </ListItem.Content>
            </ListItem>
          </View>

          {/* {LIST} */}
          <View style={{ backgroundColor: "white" }}>
            <ScrollView style={{ flex: 1 }}>
              <View style={{ backgroundColor: "white" }}>
                {dish.length === 1 ? (
                  <Text style={{ marginLeft: 16, fontSize: 14 }}>
                    {dish.length} Item
                  </Text>
                ) : (
                  <Text style={{ marginLeft: 16, fontSize: 14 }}>
                    {dish.length} Items
                  </Text>
                )}
                <Border width={1} backgroundColor="grey" />
              </View>

              {dish.map((item, i) => (
                <Pressable
                  onPress={() => setFeatured(item) || setModalVisible(true)}
                  // onPress={() => console.log(item)}
                  key={i}
                  style={{
                    marginLeft: 15,
                    marginRight: 10,
                    borderBottomColor: "grey",
                    borderBottomWidth: 1,
                  }}
                >
                  <View
                    key={i}
                    style={{
                      backgroundColor: "white",
                      flexDirection: "row",
                      height: 40,
                      //  justifyContent: "space-around",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: windowWidth / 2,
                      }}
                    >
                      <Text style={{ fontFamily: "MontserratSemiBold" }}>
                        {item.attributes.dishName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: windowWidth / 4,
                      }}
                    >
                      <Text style={{ fontFamily: "MontserratSemiBold" }}>
                        KES{" "}
                        {(
                          (Number(item?.attributes?.dishPrice) +
                            Number(item?.attributes?.totalAddition)) *
                          item?.attributes?.quantity
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        .00
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: windowWidth / 2,
                      }}
                    >
                      <Text style={{ fontFamily: "MontserratSemiBold" }}>
                        Tap to view more
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flex: 0.15,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: windowWidth / 1.3,
            flexDirection: "row",
            marginLeft: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", width: "50%", alignItems: "center" }}
          >
            <Text>Method of delivery </Text>
            <Text style={{ fontFamily: "MontserratSemiBold" }}>
              {methodofDelivery}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", width: "50%", alignItems: "center" }}
          >
            <Text>Paid using </Text>

            <Text style={{ fontFamily: "MontserratSemiBold" }}>
              {methodofPayment}
            </Text>
            <Text
              onPress={() => setModalVisible2(true)}
              style={{ color: "blue" }}
            >
              {" "}
              {""}VERIFY
            </Text>
          </View>
        </View>
        <View style={{ width: windowWidth / 2, marginRight: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "14%" }}>Shipping</Text>
            <Text style={{ width: "6%" }}>KES</Text>
            <Text>
              {shipping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              .00
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "14%" }}>Total</Text>
            <Text style={{ width: "6%" }}>KES</Text>
            <Text style={{ fontFamily: "MontserratSemiBold" }}>
              {totalPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              .00
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 0.2,
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => createTwoButtonAlert()}
            loading={loading3}
            title="DECLINE"
            buttonStyle={{
              backgroundColor: "rgba(39, 39, 39, 1)",
              height: 50,
            }}
            containerStyle={{
              width: 150,
              marginHorizontal: 30,
              marginVertical: 10,
            }}
            titleStyle={{
              color: "white",
              marginHorizontal: 20,
              fontWeight: "900",
              fontSize: 19,
            }}
          />
          <Button
            onPress={() => buttonAlert2()}
            loading={loading2}
            title="READY FOR PICKUP"
            buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)", height: 50 }}
            containerStyle={{
              width: 150,
              marginHorizontal: 30,
              marginVertical: 10,
            }}
            titleStyle={{
              color: "white",
              marginHorizontal: 20,
              fontWeight: "900",
              fontSize: 18,
            }}
          />
          <Button
            onPress={() => buttonAlert3()}
            loading={loading1}
            title="CONFIRM"
            buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)", height: 50 }}
            containerStyle={{
              width: 150,
              marginHorizontal: 30,
              marginVertical: 10,
            }}
            titleStyle={{
              color: "white",
              marginHorizontal: 20,
              fontWeight: "900",
              fontSize: 20,
            }}
          />
        </View>
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

            <View
              style={{
                flex: 0.3,
                backgroundColor: "white",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <ScrollView>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text style={styles.price}>
                      {featured?.attributes.dishName}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "15%",
                      alignItems: "center",
                    }}
                  >
                    <Text>KES</Text>
                  </View>
                  <View
                    style={{
                      width: "35%",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text>
                      {" "}
                      {featured?.attributes.dishPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      .00
                    </Text>
                  </View>
                </View>

                {featured?.attributes?.cartModifiers?.map((item, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "50%" }}>
                      <Text>{item.name}</Text>
                    </View>
                    <View
                      style={{
                        width: "15%",
                        alignItems: "center",
                      }}
                    >
                      <Text>KES</Text>
                    </View>
                    <View
                      style={{
                        width: "35%",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <Text>
                        {item?.value
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        .00
                      </Text>
                    </View>
                  </View>
                ))}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                    }}
                  >
                    <Text style={styles.subtotalTitle}>Subtotal</Text>
                  </View>
                  <View style={{ width: "20%" }}>
                    <Text style={styles.title}>
                      {"x" + featured?.attributes?.quantity}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ marginRight: 45 }}>KES</Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text style={styles.subtotalPrice}>
                      {(
                        (Number(featured?.attributes?.dishPrice) +
                          Number(featured?.attributes?.totalAddition)) *
                        featured?.attributes?.quantity
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      .00
                    </Text>
                  </View>
                </View>
              </ScrollView>
              {featured?.attributes?.SpecialInstructions !== "" ? (
                <View>
                  <Text>Special Instructions from {userName}</Text>
                  <Text>{featured?.attributes?.SpecialInstructions}</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalVisible2}>
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            <Pressable onPress={() => setModalVisible2(!modalVisible2)}>
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

            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                marginLeft: 10,
                marginRight: 10,
                height: 200,
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "MontserratSemiBold" }}>
                Paid using {methodofPayment}
              </Text>
              <Text style={{ height: "100%", width: "80%" }}>
                {verificationMessage}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DetailedOrder;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    // marginTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    //padding: 35,
    width: windowWidth,
    height: windowHeight,
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

  centeredView2: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  modalView2: {
    // marginTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    //padding: 35,
    width: windowWidth / 2,
    height: windowHeight / 2,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
