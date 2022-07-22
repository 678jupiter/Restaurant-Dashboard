import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import React, { Component, useEffect } from "react";
import { Input } from "@rneui/base";
import { CheckBox } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../config";
import axios from "axios";
import { EvilIcons } from "@expo/vector-icons";
import { Space } from "../../components";
import { dfhs } from "@env";
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export class EditModifier extends Component {
  state = {
    prevModifires: [],
    custom_fields: null,
    required: false,
    optional: true,
    tick: false,
    isSubmitting: false,
    choice: "",
    numerTo: 1,
    modalVisible: false,
    custom_fields: [],
    fetchingData: false,
  };
  mergeItems() {
    this.setState({
      prevModifires: [...this.state.prevModifires, ...this.state.custom_fields],
    });
    this.setState({ custom_fields: [] });
  }

  addCustomField() {
    this.setState({
      custom_fields: [
        ...this.state.custom_fields,
        { meta_name: "", meta_value: "0" },
      ],
    });
  }
  OnCustomInputNameHandler = (value, index) => {
    this.state.custom_fields[index].meta_name = value;
    this.setState({ custom_fields: this.state.custom_fields });
  };
  OnCustomInputKeyHandler = (value, index) => {
    this.state.custom_fields[index].meta_value = value;
    this.setState({ custom_fields: this.state.custom_fields });
  };
  deleteDynamicField = (index) => {
    this.state.custom_fields.splice(index, 1);
    this.setState({ custom_fields: this.state.custom_fields });
  };

  openModal = () => {
    this.addCustomField();
    this.setState({ modalVisible: true });
  };
  closeModal = () => {
    this.mergeItems();
    this.setState({ modalVisible: false });
  };
  cancelModal = () => {
    this.setState({ modalVisible: false });
    this.setState({ custom_fields: [] });
  };
  updateCache = (item) => {
    this.state.prevModifires.splice(this.state.prevModifires.indexOf(item), 1);
    const newarr = this.state.prevModifires;
    this.setState({ prevModifires: newarr });
  };
  getPrevMofifires = () => {
    const userData = useSelector((state) => state.user.usermeta);
    const authAxios = axios.create({
      baseURL: `${dfhs}`,
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    });
    const navigation = this.props;
    const { modifierId, numberofitemstochoose, title, isRequired, child } =
      navigation.route.params;
    this.setState({ fetchingData: true });
    authAxios
      .get(`modifiers/${modifierId}`)
      .then((res) => {
        this.setState({ fetchingData: false });
        const {
          data: {
            attributes: {
              Numberofitemstochoose,
              Title,
              isRequired,
              modifierChild,
            },
          },
        } = res.data;
        this.setState({ prevModifires: modifierChild });
        this.setState({ tick: isRequired });
        this.setState({ choice: Title });
        this.setState({ numerTo: Numberofitemstochoose });

        if (isRequired === true) {
          this.setState({ tick: true });
          this.setState({ required: true });
          this.setState({ optional: false });
        }
        if (isRequired === false) {
          this.setState({ tick: false });
          this.setState({ optional: true });
          this.setState({ required: false });
        }
        this.setState({ fetchingData: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.getPrevMofifires();
  };

  render() {
    const navigation = this.props;
    const { modifierId, numberofitemstochoose, title, isRequired, child } =
      navigation.route.params;
    // console.log(child);

    //console.log(this.state.custom_fields);

    const check = () => {
      const last =
        this.state.custom_fields[this.state.custom_fields.length - 1];
      const fields = this.state.custom_fields.length;
      const nuchose = this.state.numerTo;
      if (last === undefined) {
        Alert.alert("At least one  item is required.");
      } // true
      if (nuchose == fields || nuchose >= Math.max(1)) {
        console.log("true");
      }
      // false
      if (nuchose < 1 || nuchose <= 0) {
        Alert.alert("Number of items is incorrect");
      }
      if (this.state.choice === "") {
        Alert.alert("Title is missing.");
      } else {
        createModifier();
      }
    };
    const isCherries = () => {
      const nuchose = this.state.numerTo;
      const result = this.state.custom_fields.find(
        ({ meta_name }) => meta_name === ""
      );
      if (nuchose < 1 || nuchose <= 0) {
        return false;
      }
      if (result === undefined) {
        //console.log("true");
        return true;
      } else {
        Alert.alert("Field Name Should Not Be Empty");

        return false;
      }
    };

    const createModifier = () => {
      if (!isCherries()) {
        return;
      }
      this.closeModal();
    };

    const checkUpper = () => {
      const fields = this.state.custom_fields.length;
      const nuchose = this.state.numerTo;

      if (nuchose == fields || nuchose >= Math.max(1)) {
        console.log("true");
      }
      // false
      if (nuchose < 1 || nuchose <= 0) {
        Alert.alert("Number of items is incorrect");
      }
      if (this.state.choice === "") {
        Alert.alert("Title is missing.");
      }
      if (this.state.prevModifires.length === 0) {
        Alert.alert("At least one  item is required.");
      } else {
        updateItemModifier();
      }
    };
    const userData = useSelector((state) => state.user.usermeta);
    const authAxios = axios.create({
      baseURL: `${dfhs}`,
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    });
    const updateItemModifier = () => {
      const navigation = this.props;
      const { modifierId } = navigation.route.params;
      this.setState({ isSubmitting: true });

      authAxios
        .put(`modifiers/${modifierId}`, {
          data: {
            Title: this.state.choice,
            Numberofitemstochoose: this.state.numerTo,
            isRequired: this.state.tick,
            modifierChild: this.state.prevModifires,
          },
        })
        .then((res) => {
          console.log(1);
          this.setState({ isSubmitting: false });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isSubmitting: false });
        });
    };

    return (
      <SafeAreaView style={styles.safe}>
        {this.setState.fetchingData ? (
          <View
            style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <>
            <View style={styles.header}></View>
            <View style={styles.title}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>Title</Text>
              <Space width={10} />
              <View style={{ width: windowWidth / 1.3 }}>
                <Input
                  placeholder="Choice of Spice"
                  onChangeText={(text) => this.setState({ choice: text })}
                  defaultValue={this.state.choice}
                />
              </View>
            </View>
            <View style={styles.question}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                How many items can the customer choose?
              </Text>
              <Space width={70} />

              <View style={{ width: windowWidth / 12 }}>
                <TextInput
                  // placeholder="1"
                  style={styles.numberInput}
                  onChangeText={(text) => this.setState({ numerTo: text })}
                  placeholderTextColor="black"
                  keyboardType={"numeric"}
                  defaultValue={this.state.numerTo.toString()}
                />
              </View>
            </View>
            <View style={styles.requied}>
              <CheckBox
                checked={this.state.required}
                checkedColor="#0F0"
                checkedTitle="Required"
                containerStyle={{ width: "40%" }}
                size={30}
                textStyle={{}}
                title="Required"
                titleProps={{}}
                uncheckedColor="#F00"
                onIconPress={() =>
                  this.setState({ optional: false }) ||
                  this.setState({ required: true }) ||
                  this.setState({ tick: true })
                }
              />
              <CheckBox
                checked={this.state.optional}
                checkedColor="#0F0"
                checkedTitle="Optional"
                containerStyle={{ width: "40%" }}
                size={30}
                textStyle={{}}
                title="Optional"
                titleProps={{}}
                uncheckedColor="#F00"
                onIconPress={() =>
                  this.setState({ optional: true }) ||
                  this.setState({ required: false }) ||
                  this.setState({ tick: false })
                }
              />
            </View>
            <View style={styles.available}>
              <ScrollView
                style={{}}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={true}
                indicatorStyle={{ colors: "#000" }}
              >
                {this.state.prevModifires?.map((item, i) => (
                  <View
                    key={i}
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
                          <TouchableOpacity
                            onPress={() => this.updateCache(item)}
                            style={{ marginRight: 20, marginLeft: 20 }}
                          >
                            <EvilIcons name="trash" size={30} color="black" />
                          </TouchableOpacity>
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
                      style={{
                        margin: 6,
                        backgroundColor: "rgba(39, 39, 39, 1)",
                      }}
                    ></View>
                  </View>
                ))}
              </ScrollView>
            </View>
            <View style={styles.add}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => this.openModal()}
              >
                <Ionicons name="add-sharp" size={28} color="#2196F3" />
                <Text style={{ color: "#2196F3", fontSize: 18 }}>
                  ADD ANOTHER ITEM
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.savecancel}>
              <View
                style={{
                  alignSelf: "flex-end",
                  marginRight: 50,
                  flexDirection: "row",
                }}
              >
                <Pressable
                  onPress={() => this.props.navigation.goBack()}
                  style={{
                    backgroundColor: colors.dark_gray,
                    padding: 20,
                    alignItems: "center",
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: 4,
                    marginBottom: "auto",
                    padding: 10,
                    elevation: 2,
                    width: 120,
                    height: 60,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                  >
                    CANCEL
                  </Text>
                </Pressable>
                {this.state.isSubmitting === false ? (
                  <Pressable
                    onPress={() => checkUpper()}
                    style={{
                      backgroundColor: colors.slate,
                      padding: 20,
                      alignItems: "center",
                      marginLeft: 10,
                      marginRight: 10,
                      borderRadius: 4,
                      marginBottom: "auto",
                      padding: 10,
                      elevation: 2,
                      width: 120,
                      height: 60,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      SAVE
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={{
                      backgroundColor: colors.slate,
                      padding: 20,
                      alignItems: "center",
                      marginLeft: 10,
                      marginRight: 10,
                      borderRadius: 4,
                      marginBottom: "auto",
                      padding: 10,
                      elevation: 2,
                      width: 120,
                      height: 60,
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator color="white" size="large" />
                  </Pressable>
                )}
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 20,
                      color: colors.slate,

                      fontWeight: "600",
                    }}
                  >
                    New Item
                  </Text>
                  {this.state.custom_fields.map((customInput, key) => {
                    return (
                      <View style={styles.newinput} key={key}>
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
                                marginLeft: 10,
                                color: "black",
                              }}
                            >
                              Name
                            </Text>
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
                              value={customInput.key}
                              onChangeText={(name) => {
                                this.OnCustomInputNameHandler(name, key);
                              }}
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
                            <Text
                              style={{
                                fontSize: 20,
                                marginLeft: 10,
                                color: "black",
                              }}
                            >
                              KSH
                            </Text>
                            <TextInput
                              style={{
                                height: 40,
                                width: windowWidth / 16,
                                borderWidth: 1,

                                margin: 12,
                                borderBottomWidth: 1,
                                padding: 10,
                              }}
                              placeholder="0"
                              textAlign="center"
                              keyboardAppearance="default"
                              keyboardType={"numeric"}
                              onChangeText={(value) => {
                                this.OnCustomInputKeyHandler(value, key);
                              }}
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
                    );
                  })}

                  <View style={{ marginLeft: 35 }}>
                    <Text
                      onPress={() => createModifier()}
                      style={{
                        marginTop: 10,
                        fontSize: 20,
                        color: colors.slate,
                        fontWeight: "600",
                      }}
                    >
                      SAVE
                    </Text>
                    <Text
                      onPress={() => this.cancelModal()}
                      style={{
                        marginTop: 10,
                        fontSize: 20,
                        color: colors.slate,
                        fontWeight: "600",
                      }}
                    >
                      Cancel
                    </Text>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        )}
      </SafeAreaView>
    );
  }
}

export default EditModifier;
const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { flex: 0.07 },
  title: {
    flex: 0.06,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  question: {
    flex: 0.08,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  requied: {
    flex: 0.13,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  available: {
    flex: 0.52,
    // backgroundColor: "yellow",
  },
  add: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  savecancel: {
    flex: 0.09,
    justifyContent: "center",
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
  newinput: {
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
    width: windowWidth / 1.8,
    height: 50,
    justifyContent: "center",
    alignContent: "center",
  },
  numberInput: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 2,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 40,
    margin: 12,
    borderWidth: 1,
    //padding: 10,
    textAlign: "center",
  },
  centeredView: {
    //flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    marginTop: 120,
    backgroundColor: "white",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    height: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
});
