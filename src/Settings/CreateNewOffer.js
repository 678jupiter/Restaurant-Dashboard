import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Keyboard,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/base";
import { IconText, ModalBottom } from "../../components";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Space } from "../../components/atoms";
import { dfhs } from "@env";
import mime from "mime";
import { showMessage } from "react-native-flash-message";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const CreateNewOffer = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [image, setImage] = useState(null);
  const [imgUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tax, setTax] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
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
    setMessage("");
    setLoading(true);
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
          const [{ url }] = res.data;
          var imageId = url;
          setImageUrl(imageId);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);

          if (error.message === "Network Error") {
            Alert.alert(
              "Your device has no internet connection. Please connect and try again."
            );
          } else {
            setMessage(() => (
              <Text>There was an error while uploading the image. </Text>
            ));
          }
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
          const [{ url }] = res.data;
          var imageId = url;
          setImageUrl(imageId);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (error.message === "Network Error") {
            Alert.alert(
              "Your device has no internet connection. Please connect and try again."
            );
          } else {
            setMessage(() => (
              <Text>There was an error while uploading the image. </Text>
            ));
          }
        });
    }
  };

  const isFormValid = () => {
    if (
      imgUrl === "" ||
      name === "" ||
      description === "" ||
      tax === "" ||
      price === ""
    ) {
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
    setLoading(true);
    setMessage("");
    await authAxios
      .post(`special-offers`, {
        data: {
          name: name,
          description: description,
          price: price,
          image: imgUrl,
          // itemQuantity: 10000,
          dishVisibility: true,
          Tax: tax,
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
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.message === "Network Error") {
          Alert.alert(
            "Your device has no internet connection. Please connect and try again."
          );
        } else {
          showMessage({
            message: "Update failed, try again.",
            // description: "All fields are required",
            type: "warning",
            backgroundColor: "orange",
            color: "#fff",
            icon: "warning",
            //position: "right",
            statusBarHeight: "34",
          });
        }
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
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.9,
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <View style={{ justifyContent: "space-evenly" }}>
            <View style={{ width: windowWidth / 3 }}>
              <Input
                placeholder="Item Name"
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={{ width: windowWidth / 3 }}>
              <Input
                placeholder="Item Description"
                onChangeText={(text) => setDescription(text)}
              />
            </View>
            <View style={{ width: windowWidth / 3 }}>
              <Input
                placeholder="Item Price"
                onChangeText={(text) => setPrice(text)}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={{ justifyContent: "space-evenly" }}>
            <View style={{ width: windowWidth / 3 }}>
              <Input
                placeholder="Tax"
                onChangeText={(text) => setTax(text)}
                keyboardType="numeric"
              />
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{
                  //  uri: `${userData.image}`,
                  uri: image,
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
      </ScrollView>
      {keyboardStatus === "Keyboard Shown" ? null : (
        <View
          style={{
            alignItems: "center",
            flex: 0.2,
            justifyContent: "center",
          }}
        >
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
            }}
            titleStyle={{
              color: "white",
              fontWeight: "900",
              fontSize: 20,
            }}
          />
        </View>
      )}
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

export default CreateNewOffer;

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
