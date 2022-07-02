import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Button } from "react-native";
import { Card } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const SettingScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(39, 39, 39, 1)",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "row",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("itemList")}>
          <Card
            containerStyle={{
              width: 150,
              height: 150,
              backgroundColor: "#dcffee",
            }}
          >
            <Card.Title
              style={{ fontFamily: "MontserratSemiBold", fontSize: 18 }}
            >
              Items
            </Card.Title>
            <View
              style={{
                position: "relative",
                alignItems: "center",
                marginTop: 17,
              }}
            >
              <FontAwesome5 name="clipboard-list" size={42} color="#5cb1ff" />
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("cartegories")}>
          <Card
            containerStyle={{
              width: 150,
              height: 150,
              backgroundColor: "#dcffee",
            }}
          >
            <Card.Title
              style={{ fontFamily: "MontserratSemiBold", fontSize: 18 }}
            >
              Cartegories
            </Card.Title>
            <View
              style={{
                position: "relative",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <MaterialIcons name="post-add" size={45} color="#5cb1ff" />
            </View>
          </Card>
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("specialOffers")}>
          <Card
            containerStyle={{
              width: 150,
              height: 150,
              backgroundColor: "#dcffee",
            }}
          >
            <Card.Title
              style={{ fontFamily: "MontserratSemiBold", fontSize: 18 }}
            >
              Special Offers
            </Card.Title>
            <View style={{ position: "relative", alignItems: "center" }}>
              <MaterialIcons name="local-offer" size={40} color="#5cb1ff" />
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("settings")}>
          <Card
            containerStyle={{
              width: 150,
              height: 150,
              backgroundColor: "#dcffee",
            }}
          >
            <Card.Title
              style={{ fontFamily: "MontserratSemiBold", fontSize: 18 }}
            >
              Settings
            </Card.Title>
            <View
              style={{
                position: "relative",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Ionicons name="ios-settings" size={42} color="#5cb1ff" />
            </View>
          </Card>
        </TouchableOpacity>
      </View>

      {/* <Button
        title="navigate to edit"
        onPress={() => navigation.navigate("edit")}
      ></Button> */}
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
