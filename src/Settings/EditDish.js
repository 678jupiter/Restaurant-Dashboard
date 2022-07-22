import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Modal,
  Pressable,
  FlatList,
  Touchable,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ButtonGroup, Input } from "@rneui/themed";
import { Button } from "@rneui/base";
import { IconText, ModalBottom } from "../../components";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Border, Space } from "../../components/atoms";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import mime from "mime";
import { showMessage } from "react-native-flash-message";
import { colors } from "../../config";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { dfhs } from "@env";
const CARTEGORY_ID = gql`
  query ($id: ID!) {
    dish(id: $id) {
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
          restaurants {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
const modifierGp = [
  {
    Title: "Choice of Spice",
    id: "0",
  },
  {
    Title: "Choice of Drink",
    id: "2",
  },
  {
    Title: "Choice of Fruit",
    id: "3",
  },
  {
    Title: "Choice of Sugar",
    id: "4",
  },
];
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const EditDish = ({ route }) => {
  const navigation = useNavigation();

  const { Pname, Pprice, Pimage, Ptax, dId, Pdescription } = route.params;
  console.log(Pimage);

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [cartegoryId, setCartegoryId] = useState("");
  const [image, setImage] = useState(null);
  const [imgUrl, setImageUrl] = useState("");
  const [name, setName] = useState(Pname);
  const [description, setDescription] = useState(Pdescription);
  const [tax, setTax] = useState("");
  const [price, setPrice] = useState(Pprice);
  const [cartegories, setCartegories] = useState([]);
  const [loading2, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openModal, closeModal] = useState(false);
  const [messageType, setMessageType] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [cartegoryName, setCartegoryName] = useState("");

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
            navigation.navigate("modifiers", {
              dishId: dId,
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

  useEffect(() => {
    let isCancelled = false;
    const getCartegories = async () => {
      await authAxios
        .get("restaurants")
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

          setMessage(() => (
            <Text>There was an error while uploading the image. </Text>
          ));
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

      authAxios
        .post("upload", formData, {
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
          setMessage(() => (
            <Text>There was an error while uploading the image. </Text>
          ));
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

  if (loading) return <Text>Loading...</Text>;
  if (error) return `Error! ${error}`;

  if (data) {
    // console.log(data.dish.data.attributes.restaurants.data);

    const {
      dish: {
        data: {
          attributes: {
            modifiers,
            restaurants: {
              data: [id],
            },
          },
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
        .put(`dishes/${dId}`, {
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
                defaultValue={Pname}
                onChangeText={(text) => setName(text)}
                textAlign="center"
              />
            </View>
            <View style={{ width: windowWidth / 3 }}>
              <Input
                placeholder="Item Description"
                defaultValue={Pdescription}
                onChangeText={(text) => setDescription(text)}
                textAlign="center"
              />
            </View>
            <View style={{ width: windowWidth / 3 }}>
              <Input
                keyboardType={"numeric"}
                placeholder="Item Price"
                defaultValue={angile}
                onChangeText={(text) => setPrice(text)}
                textAlign="center"
              />
            </View>
            {cartegoryName === "" ? (
              <Pressable
                onPress={() => closeModal(true)}
                style={{ width: windowWidth / 3, alignItems: "center" }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "300",
                    fontStyle: "italic",
                  }}
                >
                  {id.attributes.name}
                </Text>
                <Border height={1} backgroundColor={colors.dark_gray} />
                <Text style={{ color: colors.slate, fontSize: 20 }}>
                  Press to edit cartegory
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => closeModal(true)}
                style={{ width: windowWidth / 3, alignItems: "center" }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "300",
                    fontStyle: "italic",
                  }}
                >
                  {cartegoryName}
                </Text>
                <Text style={{ color: colors.slate, fontSize: 20 }}>
                  Press to edit cartegory
                </Text>
                <Border height={1} backgroundColor={colors.slate} />
              </Pressable>
            )}
          </View>
          <View style={{ justifyContent: "space-evenly" }}>
            <View style={{ width: windowWidth / 3 }}>
              <Input
                keyboardType={"numeric"}
                placeholder="Vat"
                onChangeText={(text) => setTax(text)}
                defaultValue={Ptax}
                textAlign="center"
              />
            </View>
            <View
              style={{
                alignItems: "center",
                width: windowWidth / 3,
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
            loading={loading2}
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

        <Modal
          mode="dropdown"
          animationType="slide"
          transparent={true}
          visible={openModal}
          onRequestClose={() => {
            closeModal(!openModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Feather
                name="x"
                size={28}
                color="black"
                onPress={() => closeModal(!openModal)}
              />
              <View style={{ flex: 0.08 }}>
                <Picker
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                    setCartegoryId(itemValue.id) ||
                    setCartegoryName(itemValue.attributes.name) ||
                    refetch()
                  }
                >
                  {cartegories?.map((i) => (
                    <Picker.Item
                      key={i.id}
                      label={i.attributes.name}
                      value={i}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </Modal>
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

export default EditDish;

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
