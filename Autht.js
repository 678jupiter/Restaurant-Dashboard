import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { Input } from "@rneui/themed";
import { CheckBox } from "@rneui/themed";

const windowWidth = Dimensions.get("window").width;

const Modifiers = () => {
  const [checked, setChecked] = React.useState(false);
  const [inputFields, setInputFields] = React.useState([{ name: "", age: "" }]);
  const handleFormChange = (index, text) => {
    let data = [...inputFields];
    data[index][text] = text;
    setInputFields(data);
  };
  const addFields = () => {
    let newfield = { name: "", age: "" };
    setInputFields([...inputFields, newfield]);
  };

  const submit = () => {
    console.log(inputFields);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}>
        <View style={{ width: windowWidth / 3 }}>
          <Input placeholder="Choice of" />
        </View>

        <View style={{ width: windowWidth / 12 }}>
          <Input placeholder="No." />
        </View>

        <CheckBox
          checked={checked}
          checkedColor="#0F0"
          checkedTitle="Required"
          containerStyle={{ width: "75%" }}
          onIconPress={() => setChecked(!checked)}
          onLongIconPress={() => console.log("onLongIconPress()")}
          onLongPress={() => console.log("onLongPress()")}
          onPress={() => console.log("onPress()")}
          size={30}
          textStyle={{}}
          title="is it required?"
          titleProps={{}}
          uncheckedColor="#F00"
        />
      </View>

      <View style={{ alignItems: "center" }}>
        {inputFields.map((input, index) => {
          return (
            <View style={{ flexDirection: "row" }} key={index}>
              <View style={{ width: windowWidth / 3 }}>
                <Input
                  placeholder="Name"
                  name="name"
                  onChange={(text) => handleFormChange(index, text)}
                />
              </View>

              <View style={{ width: windowWidth / 3 }}>
                <Input
                  name="age"
                  placeholder="Age"
                  onChange={(text) => handleFormChange(index, text)}
                />
              </View>
            </View>
          );
        })}

        <Text onPress={() => addFields()}>Add new Item</Text>
        <Text onPress={() => submit()}>Submit</Text>
      </View>
    </SafeAreaView>
  );
};

export default Modifiers;

const styles = StyleSheet.create({});
