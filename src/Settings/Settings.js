import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Modal,
  Dimensions,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from "@react-native-community/datetimepicker";
import { ListItem, Avatar, Icon } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@rneui/base";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Settings = () => {
  const [PauseModalVisible, setPauseModalVisible] = useState(false);
  const [reasonModal, setReasonModal] = useState(false);
  const [openingHoursModailVisible, setOpeningHoursModailVisible] =
    useState(false);
  const [clossingHoursModailVisible, setClossingHoursModailVisible] =
    useState(false);
  const [holidayModal, setHoliday] = useState(false);

  const moveToNextModal = () => {
    setPauseModalVisible(!PauseModalVisible);
    setReasonModal(true);
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Opening hours</ListItem.Title>
          <ListItem.Subtitle>Opening hours</ListItem.Subtitle>
          <ListItem.Subtitle>Opening hours</ListItem.Subtitle>
          <ListItem.Subtitle>Opening hours</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Title onPress={() => setOpeningHoursModailVisible(true)}>
          EDIT
        </ListItem.Title>
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Subtitle>Clossing hours</ListItem.Subtitle>
          <ListItem.Subtitle>Clossing hours</ListItem.Subtitle>
          <ListItem.Subtitle>Clossing hours</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Title onPress={() => setClossingHoursModailVisible(true)}>
          EDIT
        </ListItem.Title>
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Holidays </ListItem.Title>
          <ListItem.Subtitle>When</ListItem.Subtitle>
          <ListItem.Subtitle>When</ListItem.Subtitle>
          <ListItem.Subtitle>When</ListItem.Subtitle>
          <ListItem.Subtitle>When</ListItem.Subtitle>
          <ListItem.Subtitle>When</ListItem.Subtitle>
          <ListItem.Subtitle>When</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Title
          onPress={() => {
            setHoliday(true);
          }}
        >
          Edit
        </ListItem.Title>
      </ListItem>

      <View
        style={{
          flex: 0.8,
          alignItems: "flex-start",
          marginLeft: 13,
          marginTop: 10,
        }}
      >
        <Button type="outline" onPress={() => setPauseModalVisible(true)}>
          <Icon name="pause" color="rgba(39, 39, 39, 1)" size={60} />
        </Button>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={PauseModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setPauseModalVisible(!PauseModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 0.08 }}>
              <Text>Pause Order</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                flex: 0.8,
              }}
            >
              <Button type="outline">10 min</Button>
              <Button type="outline">15 min</Button>
              <Button type="outline">20 min</Button>
              <Button type="outline">25 min</Button>
              <Button type="outline">30 min</Button>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                // alignItems: "center",
                flex: 0.8,
              }}
            >
              <Button type="outline">Other</Button>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 0.2,
              }}
            >
              <Button
                onPress={() => setPauseModalVisible(!PauseModalVisible)}
                title="CANCEL"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
              <Button
                onPress={() => moveToNextModal()}
                title="NEXT"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openingHoursModailVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setOpeningHoursModailVisible(!openingHoursModailVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 0.08 }}>
              <Text>Openning Hours</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                flex: 0.8,
              }}
            >
              <Text>Set Time</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 0.2,
              }}
            >
              <Button
                onPress={() =>
                  setOpeningHoursModailVisible(!openingHoursModailVisible)
                }
                title="CANCEL"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
              <Button
                onPress={() =>
                  setOpeningHoursModailVisible(!openingHoursModailVisible)
                }
                title="SAVE"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={clossingHoursModailVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setClossingHoursModailVisible(!clossingHoursModailVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 0.08 }}>
              <Text>Clossing Hours</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                flex: 0.8,
              }}
            >
              <Text>Set Time</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 0.2,
              }}
            >
              <Button
                onPress={() =>
                  setClossingHoursModailVisible(!clossingHoursModailVisible)
                }
                title="CANCEL"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
              <Button
                onPress={() =>
                  setClossingHoursModailVisible(!clossingHoursModailVisible)
                }
                title="SAVE"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={holidayModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setHoliday(!holidayModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 0.08 }}>
              <Text>Holiday</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                flex: 0.8,
              }}
            >
              <Text>Set Holiday</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 0.2,
              }}
            >
              <Button
                onPress={() => setHoliday(!holidayModal)}
                title="CANCEL"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
              <Button
                onPress={() => setHoliday(!holidayModal)}
                title="SAVE"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={reasonModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setReasonModal(!reasonModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 0.08 }}>
              <Text>Pause Orders</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                flex: 0.8,
              }}
            >
              <Text>Reson For Pause</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 0.2,
              }}
            >
              <Button
                onPress={() => setReasonModal(!reasonModal)}
                title="CANCEL"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
              <Button
                onPress={() => setReasonModal(!reasonModal)}
                title="SAVE"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: windowHeight / 1.5,
    width: windowWidth / 1.2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Settings;
