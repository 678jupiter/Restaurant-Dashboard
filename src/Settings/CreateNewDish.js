import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Icon } from "@rneui/themed";
import { Button } from "@rneui/base";
import { IconText, ModalBottom } from "../../components";
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import { Space } from "../../components/atoms";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const windowWidth = Dimensions.get("window").width;
const countries = ["Egypt", "Canada", "Australia", "Ireland"];
const CreateNewDish = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [cartegoryId, setCartegoryId] = useState();
  const uploadImage = async () => {};

  const captureImage = async () => {};
  const [cartegories, setCartegories] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    const getCartegories = async () => {
      await axios
        .get("http://localhost:1337/api/restaurants")
        .then(function (response) {
          // console.log(response.data);
          const { data } = response.data;
          // console.log(data);
          setCartegories(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getCartegories();
    return () => {
      isCancelled = true;
    };
  }, []);

  const onFinish = ({ name, description, price }) => {
    axios
      .post("http://localhost:1337/api/dishes", {
        data: {
          amount: 1,
          name: name,
          description: description,
          price: price,
          image: imurl,
          itemQuantity: 10000,
          restaurants: cartegoryId,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 0.9,
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <View style={{ justifyContent: "space-evenly" }}>
          <View style={{ width: windowWidth / 3 }}>
            <Input placeholder="Item Name" secureTextEntry={true} />
          </View>
          <View style={{ width: windowWidth / 3 }}>
            <Input placeholder="Item Description" secureTextEntry={true} />
          </View>
          <View style={{ width: windowWidth / 3 }}>
            <Input placeholder="Item Price" secureTextEntry={true} />
          </View>
          <View style={{ width: windowWidth / 3 }}>
            <SelectDropdown
              data={cartegories}
              // defaultValueByIndex={1}
              // defaultValue={'Egypt'}
              onSelect={(selectedItem, index) => {
                setCartegoryId(selectedItem.id);
              }}
              defaultButtonText={"Select cartegory"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.attributes.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.attributes.name;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>
        </View>
        <View style={{ justifyContent: "space-evenly" }}>
          <View style={{ width: windowWidth / 3 }}>
            <Input placeholder="Tax" secureTextEntry={true} />
          </View>
          <View
            style={{
              alignItems: "center",
              borderColor: "red",
              borderWidth: 2,
            }}
          >
            <ImageBackground
              source={{
                //  uri: `${userData.image}`,
                uri: `https://images.unsplash.com/photo-1654476728696-8344dfc78585?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60`,
              }}
              style={styles.avatar}
            >
              <TouchableOpacity
                style={{
                  top: 140,

                  paddingVertical: 13,
                  alignItems: "center",
                  opacity: 0.8,
                  backgroundColor: "black",
                }}
                onPress={toggleModal}
              >
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontFamily: "CircularStdBold",
                      fontSize: 14,
                    }}
                  >
                    Upload
                  </Text>
                </View>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 0.2,
          justifyContent: "center",
        }}
      >
        <Button
          title="Submit"
          buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)", height: 80 }}
          containerStyle={{
            width: windowWidth / 3,
            marginHorizontal: 30,
            marginVertical: 10,
          }}
          titleStyle={{
            color: "white",
            fontWeight: "900",
            fontSize: 20,
          }}
        />
      </View>
      {/* 
      <Space height={10} />
      <View style={{ width: windowWidth / 3 }}>
        <Input placeholder="Short Description" secureTextEntry={true} />
      </View>
      <Space height={10} />

     
      <Space height={30} />
      <Button
        title="Submit"
        buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)", height: 80 }}
        containerStyle={{
          width: windowWidth / 3,
          marginHorizontal: 30,
          marginVertical: 10,
        }}
        titleStyle={{
          color: "white",
          marginHorizontal: 20,
          fontWeight: "900",
          fontSize: 20,
        }}
      />*/}
      <ModalBottom
        onBackdropPress={toggleModal}
        isVisible={isModalVisible}
        onPress={toggleModal}
        label="Close"
      >
        <TouchableOpacity onPress={captureImage}>
          <IconText icon="📷" text="Take Photo" />
        </TouchableOpacity>
        <Space height={10} />
        <TouchableOpacity onPress={uploadImage}>
          <IconText icon="🖼" text="Choose From Gallery" />
        </TouchableOpacity>
        <Space height={20} />
      </ModalBottom>
    </View>
  );
};

export default CreateNewDish;

const styles = StyleSheet.create({
  item: {
    aspectRatio: 1,
    width: "25%",
  },
  avatar: {
    overflow: "hidden",
    borderRadius: 20,
    width: 180,
    height: 180,
    backgroundColor: "grey",
  },
  dropdown1BtnStyle: {
    width: windowWidth / 3,
    height: 50,
    //backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});
