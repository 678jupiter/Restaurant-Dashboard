import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@rneui/base";
import { ScrollView } from "react-native";
import { colors } from "./config";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const EditArray = () => {
  const [prevModifires, setPrevModifires] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getPrevMofifires = () => {
    axios
      .get(`http://localhost:1337/api/modifiers/40`)
      .then((res) => {
        const {
          data: {
            attributes: { modifierChild },
          },
        } = res.data;
        setPrevModifires(modifierChild);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPrevMofifires();
  }, []);

  var projects = [
    {
      meta_name: "Green",
      meta_value: "0",
    },
    {
      meta_name: "Red",
      meta_value: "0",
    },
    {
      meta_name: "Red",
      meta_value: "1",
    },
  ];

  const update = () => {
    let search_meta_name = "Red";
    let search_meta_value = "1";
    projects.forEach((item, index) => {
      if (
        item.meta_name == search_meta_name &&
        item.meta_value == search_meta_value
      )
        projects[index].meta_name = "BITCH";
    });
  };
  update();
  console.log(prevModifires);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.5,
          paddingTop: 20,
        }}
      >
        <ScrollView style={{}}>
          {prevModifires?.map((item, i) => (
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.layout}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    //  marginTop: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        // fontWeight: "bold",
                        marginLeft: 10,
                        color: "black",
                      }}
                    >
                      {item.meta_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        // fontWeight: "bold",
                        marginLeft: 10,
                        color: "black",
                      }}
                    >
                      KSH {item.meta_value}
                    </Text>
                    <View style={{ marginRight: 20, marginLeft: 20 }}>
                      <EvilIcons name="trash" size={30} color="black" />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginTop: 6,
                  }}
                ></View>
              </View>
              <View
                style={{ margin: 6, backgroundColor: "rgba(39, 39, 39, 1)" }}
              ></View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          flex: 0.5,
        }}
      >
        <View style={styles.input}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              //  marginTop: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <TextInput
                style={{
                  height: 40,
                  width: windowWidth / 5,

                  margin: 12,
                  borderBottomWidth: 1,
                  padding: 10,
                }}
                placeholder="Name"
                textAlign="left"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                marginTop: 4,
              }}
            >
              <TextInput
                style={{
                  height: 40,
                  width: windowWidth / 16,
                  borderWidth: 1,

                  margin: 12,
                  borderBottomWidth: 1,
                  padding: 10,
                }}
                placeholder="Fee"
                textAlign="left"
                keyboardAppearance="default"
                keyboardType="number-pad"
              />
              <View style={{ marginRight: 20, marginLeft: 20 }}>
                <EvilIcons name="trash" size={30} color="black" />
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 6,
            }}
          ></View>
        </View>
        <View
          style={{ margin: 6, backgroundColor: "rgba(39, 39, 39, 1)" }}
        ></View>
      </View>
    </SafeAreaView>
  );
};

export default EditArray;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  layout: {
    backgroundColor: "white",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 8,

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: windowWidth / 2,
    height: 50,
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: windowWidth / 2,
    height: 50,
    justifyContent: "center",
    alignContent: "center",
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
