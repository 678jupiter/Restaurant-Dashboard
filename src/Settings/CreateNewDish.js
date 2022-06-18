import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/base";
import { IconText, ModalBottom } from "../../components";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Space } from "../../components/atoms";
import { Picker } from "@react-native-picker/picker";
import mime from "mime";

const windowWidth = Dimensions.get("window").width;
const CreateNewDish = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [cartegoryId, setCartegoryId] = useState("");
  const [image, setImage] = useState(null);
  const [imgUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tax, setTax] = useState("");
  const [price, setPrice] = useState("");
  const [cartegories, setCartegories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

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

      axios
        .post("http://localhost:1337/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const [
            {
              formats: {
                medium: { url },
              },
            },
          ] = res.data;
          var imageId = url;
          setImageUrl(imageId);
          setLoading(false);
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

      axios
        .post("http://localhost:1337/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const [
            {
              formats: {
                medium: { url },
              },
            },
          ] = res.data;
          var imageId = url;
          setImageUrl(imageId);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("2" + error);
        });
    }
  };

  const isFormValid = () => {
    if (
      cartegoryId === "" ||
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

    await axios
      .post("http://localhost:1337/api/dishes", {
        data: {
          name: name,
          description: description,
          price: price,
          image: imgUrl,
          itemQuantity: 10000,
          restaurants: cartegoryId,
          dishVisibility: true,
          Tax: tax,
        },
      })
      .then((res) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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
            <Input
              placeholder="Item Name"
              secureTextEntry={true}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={{ width: windowWidth / 3 }}>
            <Input
              placeholder="Item Description"
              secureTextEntry={true}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View style={{ width: windowWidth / 3 }}>
            <Input
              placeholder="Item Price"
              secureTextEntry={true}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
          <View style={{ width: windowWidth / 3 }}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setCartegoryId(itemValue.id)
              }
            >
              {cartegories?.map((i) => (
                <Picker.Item key={i.id} label={i.attributes.name} value={i} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{ justifyContent: "space-evenly" }}>
          <View style={{ width: windowWidth / 3 }}>
            <Input
              placeholder="Tax"
              secureTextEntry={true}
              onChangeText={(text) => setTax(text)}
            />
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
});
