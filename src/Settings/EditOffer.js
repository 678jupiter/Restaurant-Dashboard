import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Keyboard,
  Animated,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/base";
import { IconText, ModalBottom } from "../../components";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Space } from "../../components/atoms";
import mime from "mime";
import { showMessage } from "react-native-flash-message";
import { dfhs } from "@env";
import { useSelector } from "react-redux";
import { colors } from "../../config";

const CARTEGORY_ID = gql`
  query ($id: ID!) {
    specialOffer(id: $id) {
      data {
        id
        attributes {
          modifiers {
            data {
              id
              attributes {
                Title
                Numberofitemstochoose
                isRequired
                modifierChild
              }
            }
          }
        }
      }
    }
  }
`;

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const EditOffer = ({ route, navigation }) => {
  const { Pname, Pprice, Pimage, Ptax, dId, Pdescription } = route.params;
  const offset = useRef(new Animated.Value(0)).current;
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
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [image, setImage] = useState(Pimage);
  const [imgUrl, setImageUrl] = useState("");
  const [name, setName] = useState(Pname);
  const [description, setDescription] = useState(Pdescription);
  const [tax, setTax] = useState("");
  const [price, setPrice] = useState(Pprice);
  const [loading2, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState();

  const angile = JSON.stringify(Pprice);
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
  const Header = () => {
    return (
      <View style={{ margin: 10, alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "CircularStdBold",
            fontSize: 18,
            color: colors.slate,
          }}
        >
          Available Modifier Groups
        </Text>
      </View>
    );
  };

  const Footer = (item) => {
    return (
      <View style={{ margin: 10, alignItems: "center" }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("offermodifier", {
              dishId: dId,
              userSample: userData.jwt,
            })
          }
        >
          <Text style={{ color: colors.slate, fontSize: 20 }}>
            Add New Group
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
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

  var id = dId;

  const { loading, error, data, refetch } = useQuery(CARTEGORY_ID, {
    variables: { id },
  });
  useEffect(() => {
    refetch();
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Network error... Please connect to the internet</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (data) {
    const {
      specialOffer: {
        data: {
          attributes: { modifiers },
        },
      },
    } = data;
    const handleSubmit = async () => {
      if (!isFormValid()) {
        return;
      }
      setLoading(true);
      setMessage("");

      await authAxios
        .put(`special-offers/${dId}`, {
          data: {
            name: name,
            description: description,
            price: price,
            image: imgUrl,
            itemQuantity: 10000,
            restaurants: id.id,
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
        })
        .catch((error) => {
          setLoading(false);
          if (error.message === "Network Error") {
            Alert.alert(
              "Your device has no internet connection. Please connect and try again."
            );
          } else {
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
        <View
          style={{
            flex: 0.9,
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={true}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: offset } } }],
              { useNativeDriver: false }
            )}
          >
            <View style={{ justifyContent: "space-evenly" }}>
              <View style={{ width: windowWidth / 3 }}>
                <Input
                  placeholder="Item Name"
                  defaultValue={Pname}
                  onChangeText={(text) => setName(text)}
                />
              </View>
              <View style={{ width: windowWidth / 3 }}>
                <Input
                  placeholder="Item Description"
                  defaultValue={Pdescription}
                  onChangeText={(text) => setDescription(text)}
                />
              </View>
              <View style={{ width: windowWidth / 3 }}>
                <Input
                  keyboardType={"numeric"}
                  placeholder="Item Price"
                  defaultValue={angile}
                  onChangeText={(text) => setPrice(text)}
                />
              </View>
            </View>
          </ScrollView>

          <ScrollView>
            <View style={{ justifyContent: "space-evenly" }}>
              <View style={{ width: windowWidth / 3 }}>
                <Input
                  keyboardType={"numeric"}
                  placeholder="Tax"
                  onChangeText={(text) => setTax(text)}
                  defaultValue={Ptax}
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
                        Edit
                      </Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              justifyContent: "space-evenly",
              width: windowWidth / 3,
            }}
          >
            <FlatList
              data={modifiers.data}
              ListHeaderComponent={Header}
              ListFooterComponent={Footer}
              renderItem={({ item, i }) => (
                <View
                  key={i}
                  style={{
                    margin: 10,
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("editModifier", {
                          numberofitemstochoose:
                            item.attributes.Numberofitemstochoose,
                          title: item.attributes.Title,
                          isRequired: item.attributes.isRequired,
                          child: item.attributes.modifierChild,
                          modifierId: item.id,
                          userSample: userData.jwt,
                        })
                      }
                    >
                      <Text>{item.attributes.Title}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>

        {keyboardStatus === "Keyboard Shown" ? null : (
          <View
            style={{
              alignItems: "center",
              flex: 0.2,
              justifyContent: "center",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 13, color: "#EF4444" }}
            >
              {message}
            </Text>
            <Button
              onPress={() => handleSubmit()}
              loading={loading2}
              title="Submit"
              buttonStyle={{
                backgroundColor: "rgba(39, 39, 39, 1)",
                height: 80,
              }}
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
  }
};

export default EditOffer;

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "60%",
    width: windowWidth / 2,
  },
});
