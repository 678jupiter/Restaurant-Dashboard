import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export class NewModifier extends Component {
  state = {
    custom_fields: [{ meta_name: "", meta_value: "0" }],
    required: false,
    optional: true,
    tick: false,
    isSubmitting: false,
    choice: "",
    numerTo: 1,
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

    const createModifier = () => {
      if (!isCherries()) {
        return;
      }
      const { dishId } = navigation.route.params;
      this.setState({ isSubmitting: true });
      axios
        .post("http://localhost:1337/api/modifiers", {
          data: {
            Title: this.state.choice,
            Numberofitemstochoose: this.state.numerTo,
            isRequired: this.state.tick,
            dishes: dishId,
            modifierChild: this.state.custom_fields,
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
        <View style={styles.header}></View>
        <View style={styles.title}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Title</Text>
          <Space width={10} />
          <View style={{ width: windowWidth / 1.3 }}>
            <Input
              placeholder="Choice of Spice"
              onChangeText={(text) => this.setState({ choice: text })}
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
              placeholder="1"
              style={styles.numberInput}
              onChangeText={(text) => this.setState({ numerTo: text })}
              placeholderTextColor="black"
              keyboardType="number-pad"
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
                      keyboardType="numeric"
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
        <View style={styles.add}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              this.addCustomField();
            }}
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
                  height: 60,
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
                  height: 60,
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator color="white" size="large" />
              </Pressable>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default NewModifier;
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
    backgroundColor: "pink",
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
