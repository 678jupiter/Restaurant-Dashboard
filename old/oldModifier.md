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

export class Modifiers extends Component {
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
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 0.3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: windowWidth / 2 }}>
            <View style={{ width: windowWidth / 2 }}>
              <Input
                placeholder="Choice of Spice"
                onChangeText={(text) => this.setState({ choice: text })}
              />
            </View>
          </View>

          <View
            style={{
              width: windowWidth / 2,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              How many items can the customer choose?
            </Text>

            <View style={{ width: windowWidth / 12 }}>
              <TextInput
                placeholder="1"
                style={{
                  height: 40,
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                }}
                onChangeText={(text) => this.setState({ numerTo: text })}
                placeholderTextColor="black"
                keyboardType="number-pad"
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              width: windowWidth / 3,
            }}
          >
            <CheckBox
              checked={this.state.required}
              checkedColor="#0F0"
              checkedTitle="Required"
              containerStyle={{ width: "75%" }}
              onIconPress={() =>
                this.setState({ optional: false }) ||
                this.setState({ required: true }) ||
                this.setState({ tick: true })
              }
              size={30}
              textStyle={{}}
              title="Required"
              titleProps={{}}
              uncheckedColor="#F00"
            />
            <CheckBox
              checked={this.state.optional}
              checkedColor="#0F0"
              checkedTitle="Optional"
              containerStyle={{ width: "75%" }}
              // onIconPress={() => setChecked(!checked)}
              onIconPress={() =>
                this.setState({ optional: true }) ||
                this.setState({ required: false }) ||
                this.setState({ tick: false })
              }
              size={30}
              textStyle={{}}
              title="Optional"
              titleProps={{}}
              uncheckedColor="#F00"
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.6,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#2196F3", fontSize: 18 }}>Item</Text>

          <ScrollView>
            {this.state.custom_fields.map((customInput, key) => {
              // repeat able block
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
              // End
            })}
          </ScrollView>

          <View>
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
        </View>
        <View
          style={{
            flex: 0.1,
            // backgroundColor: "green",
            justifyContent: "center",
          }}
        >
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

export default Modifiers;
