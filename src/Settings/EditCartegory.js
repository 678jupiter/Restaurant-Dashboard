import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Input, Icon } from "@rneui/themed";
import { Button } from "@rneui/base";
import { IconText, ModalBottom } from "../../components";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { showMessage } from "react-native-flash-message";
import { dfhs } from "@env";
import axios from "axios";
import { Space } from "../../components/atoms";
import { useSelector } from "react-redux";
const windowWidth = Dimensions.get("window").width;

const EditCartegory = ({ route }) => {
  const { Cname, cId, img } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [imgUrl, setImageUrl] = useState(img);
  const [image, setImage] = useState(img);
  const [name, setName] = useState(Cname);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const userData = useSelector((state) => state.user.usermeta);
  const authAxios = axios.create({
    baseURL: `${dfhs}`,
    headers: {
      Authorization: `Bearer ${userData.jwt}`,
    },
  });
  const authAxios2 = axios.create({
    baseURL: `${dfhs}`,
    headers: {
      Authorization: `Bearer ${userData.jwt}`,
      "Content-Type": "multipart/form-data",
    },
  });
  const uploadImage = async () => {
    setLoading(true);
    setMessage("");

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      //setImageType(result.type);
      var uuri = result.uri;
      var utype = result.type;
      const newImageUri = "file:///" + uuri.split("file:/").join("");

      const formData = new FormData();

      formData.append("files", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
      });

      authAxios2
        .post("upload", formData)
        .then((res) => {
          setLoading(false);

          const [{ url }] = res.data;
          var imageId = url;
          setImageUrl(imageId);
        })
        .catch((error) => {
          setLoading(false);

          console.log(error);
        });
    }
  };
  const captureImage = async () => {
    setLoading(true);
    setMessage("");

    console.log(uid);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      // setImageUri(result.uri);
      //setImageType(result.type);
      var uuri = result.uri;
      var utype = result.type;
      const newImageUri = "file:///" + uuri.split("file:/").join("");

      const formData = new FormData();

      formData.append("files", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
      });

      authAxios2
        .post("upload", formData)
        .then((res) => {
          setLoading(false);

          const [{ url }] = res.data;
          var imageId = url;
          setImageUrl(imageId);
        })
        .catch((error) => {
          setLoading(false);

          console.log("2" + error);
        });
    }
  };
  const isFormValid = () => {
    if (imgUrl === "" || name === "") {
      setMessage(() => <Text>All fields are required!</Text>);
      setLoading(false);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    setMessage("");
    setLoading(true);

    var q = JSON.stringify(name);

    await authAxios
      .put(`restaurants/${cId}`, {
        data: {
          name: name,

          image: JSON.stringify(imgUrl),
        },
      })
      .then((res) => {
        setLoading(false);
        showMessage({
          message: "Saved.",
          // description: "All fields are required",
          type: "success",
          backgroundColor: "orange",
          color: "#fff",
          icon: "success",
          //position: "right",
          statusBarHeight: "34",
        });
      })
      .catch((error) => {
        setLoading(false);
        showMessage({
          message: "Edit failed, try again.",
          // description: "All fields are required",
          type: "warning",
          backgroundColor: "orange",
          color: "#fff",
          icon: "warning",
          //position: "right",
          statusBarHeight: "34",
        });
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <View style={{ width: windowWidth / 3 }}>
          <Input
            defaultValue={Cname}
            placeholder="Name a Cartegory"
            onChangeText={(text) => setName(text)}
            textAlign="center"
          />
        </View>
        <Space height={30} />

        <ImageBackground
          source={{
            uri: image,
          }}
          style={styles.avatar}
        >
          <TouchableOpacity
            style={{
              top: 100,
              backgroundColor: "black",
              paddingVertical: 10,
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
                Edit
              </Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
        <Space height={30} />
        <Text style={{ textAlign: "center", fontSize: 13, color: "#EF4444" }}>
          {message}
        </Text>
        <Button
          onPress={() => handleSubmit()}
          loading={loading}
          title="Submit"
          buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)", height: 80 }}
          containerStyle={{
            width: windowWidth / 4,
            marginHorizontal: 30,
            marginVertical: 10,
            height: 50,
            justifyContent: "center",
          }}
          titleStyle={{
            color: "white",
            marginHorizontal: 20,
            fontWeight: "900",
            fontSize: 20,
          }}
        />
      </ScrollView>
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
    </SafeAreaView>
  );
};

export default EditCartegory;

const styles = StyleSheet.create({
  item: {
    aspectRatio: 1,
    width: "25%",
  },
  avatar: {
    overflow: "hidden",
    borderRadius: 20,
    width: 130,
    height: 130,
    backgroundColor: "grey",
  },
});
