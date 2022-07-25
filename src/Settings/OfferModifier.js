import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component } from "react";
import { Input } from "@rneui/base";
import { CheckBox } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../config";
import axios from "axios";
import { Space } from "../../components";
import { dfhs } from "@env";
import { AntDesign } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export class NewOfferModifier extends Component {
  state = {
    custom_fields: [{ meta_name: "", meta_value: "0" }],
    required: false,
    optional: true,
    tick: false,
    isSubmitting: false,
    choice: "",
    numerTo: 1,
    modalVisible2: false,
  };

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
  render() {
    const navigation = this.props;

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
    const { dishId, userSample } = navigation.route.params;
    const authAxios = axios.create({
      baseURL: `${dfhs}`,
      headers: {
        Authorization: `Bearer ${userSample}`,
      },
    });
    const createModifier = () => {
      if (!isCherries()) {
        return;
      }
      this.setState({ isSubmitting: true });
      console.log(this.state.numerTo);
      authAxios
        .post(`modifiers`, {
          data: {
            Title: this.state.choice,
            Numberofitemstochoose: Number(this.state.numerTo),
            isRequired: this.state.tick,
            special_offers: dishId,
            modifierChild: this.state.custom_fields,
          },
        })
        .then((res) => {
          console.log(1);
          this.props.navigation.goBack();
          this.setState({ isSubmitting: false });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isSubmitting: false });
          if (error.message === "Network Error") {
            Alert.alert(
              "Your device has no internet connection. Please connect and try again."
            );
          } else {
            console.log(error);
          }
        });
    };
    return (
      <SafeAreaView style={styles.safe}>
        <View
          style={{
            flex: 0.15,
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <Pressable
            onPress={() => this.props.navigation.goBack()}
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
        {/* <View style={styles.header}></View> */}
        <View style={styles.title}>
          <Pressable
            style={{ flexDirection: "row" }}
            onPress={() => this.setState({ modalVisible2: true })}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Title</Text>
            <Space width={10} />
            <View style={{ width: windowWidth / 1.3 }}>
              <Text
                style={{
                  borderBottomColor: "grey",
                  borderBottomWidth: 1,
                }}
              >
                {this.state.choice}
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.question}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            How many items can the customer choose?
          </Text>
          <Space width={70} />

          <View style={{ width: windowWidth / 12 }}>
            <TextInput
              placeholder="1"
              style={styles.numberInput}
              onChangeText={(text) => this.setState({ numerTo: text })}
              placeholderTextColor="black"
              keyboardType={"numeric"}
            />
          </View>
        </View>
        <View style={styles.requied}>
          <CheckBox
            checked={this.state.required}
            checkedColor="#0F0"
            checkedTitle="Required"
            containerStyle={{ width: "40%", height: "100%" }}
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
            containerStyle={{ width: "40%", height: "100%" }}
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
            {this.state.custom_fields.map((customInput, key) => {
              return (
                <View
                  key={key}
                  style={{
                    flexDirection: "row",
                    alignContent: "space-around",
                    width: windowWidth,
                    justifyContent: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>
                      Name
                    </Text>

                    <TextInput
                      style={{
                        height: 40,
                        width: windowWidth / 4,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                      }}
                      value={customInput.key}
                      onChangeText={(name) => {
                        this.OnCustomInputNameHandler(name, key);
                      }}
                      placeholder={"Name"}
                      //defaultValue={customInput.meta_name}
                    />
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>Fee</Text>
                    <TextInput
                      style={{
                        height: 40,
                        width: windowWidth / 8,

                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                      }}
                      onChangeText={(value) => {
                        this.OnCustomInputKeyHandler(value, key);
                      }}
                      placeholder={"KSH 0"}
                      keyboardType={"numeric"}
                      defaultValue="0"
                    />
                  </View>
                  <View
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.deleteDynamicField(key)}
                      style={{
                        padding: 10,
                      }}
                    >
                      <Text style={{}}>
                        <Ionicons
                          name="ios-trash-outline"
                          size={24}
                          color="black"
                        />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.savecancel}>
          <View>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                this.addCustomField();
              }}
            >
              <Ionicons name="add-sharp" size={28} color="#2196F3" />
              <Text style={{ color: "#2196F3", fontSize: 16 }}>
                ADD ANOTHER ITEM
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignSelf: "flex-end",
              marginRight: 50,
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              marginBottom: 25,
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
                height: 40,
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
                onPress={() => check()}
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
                  height: 40,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
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
                  height: 40,
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
          visible={this.state.modalVisible2}
        >
          <View style={styles.centeredView2}>
            <View style={styles.modalView2}>
              <View>
                <Pressable
                  onPress={() => this.setState({ modalVisible2: false })}
                >
                  <AntDesign
                    name="close"
                    size={24}
                    color="black"
                    style={{
                      //marginLeft: 20,
                      // marginTop: 15,
                      alignSelf: "flex-start",
                    }}
                  />
                </Pressable>
              </View>

              <View style={{ width: windowWidth / 1.3 }}>
                <Input
                  placeholder="Choice of Spice"
                  onChangeText={(text) => this.setState({ choice: text })}
                  defaultValue={this.state.choice}
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

export default NewOfferModifier;
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "white" },
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
    backgroundColor: "white",
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
    flex: 0.16,
    justifyContent: "center",
    backgroundColor: "white",
    alignContent: "center",
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
    height: 30,
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
  centeredView2: {
    //flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    //marginTop: 120,
    backgroundColor: "white",
  },
  modalView2: {
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
