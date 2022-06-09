import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Input, Icon } from "@rneui/themed";
import { Button } from "@rneui/base";
import { IconText, ModalBottom } from "../../components";
import * as ImagePicker from "expo-image-picker";

import axios from "axios";
import { Space } from "../../components/atoms";
const windowWidth = Dimensions.get("window").width;

const CreateACartegory = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const uploadImage = async () => {};

  const captureImage = async () => {};
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: windowWidth / 3 }}>
        <Input placeholder="Name a Cartegory" secureTextEntry={true} />
      </View>
      <Space height={30} />

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
            backgroundColor: "black",
            paddingVertical: 13,
            alignItems: "center",
            opacity: 0.8,
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
      />
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

export default CreateACartegory;

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
});
