import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollView } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { dfhs } from "@env";

const CouriesList = () => {
  const [loading, setLoading] = useState(false);
  const [couriers, setCouriers] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [featured, setFeatured] = useState(null);
  const getCouriers = () => {
    setLoading(true);
    axios
      .get(`${dfhs}couriers`)
      .then((res) => {
        setLoading(false);
        const { data } = res.data;
        setCouriers(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    getCouriers();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text>Loading...</Text>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView>
            {couriers?.map((l, i) => (
              <ListItem
                containerStyle={{ height: 60 }}
                key={i}
                bottomDivider
                topDivider
                onPress={() => setFeatured(l) || setModalVisible(true)}
              >
                <Avatar source={{ uri: `${l.attributes.image}` }} rounded />
                <ListItem.Content>
                  <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
                    {l.attributes.firstName} {l.attributes.secondName}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))}
          </ScrollView>
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
                      {featured?.attributes.distanceFromRestaurant} KM away
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
      )}
    </SafeAreaView>
  );
};

export default CouriesList;

const styles = StyleSheet.create({
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
