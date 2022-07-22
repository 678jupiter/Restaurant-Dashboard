import { Dimensions, StyleSheet, Text, Pressable, View } from "react-native";
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
          // marginBottom: 20,
        }}
      >
        <Pressable onPress={() => navigation.navigate("itemList")}>
          <Card
            containerStyle={{
              width: 80,
              height: 80,
              backgroundColor: "#dcffee",
            }}
          >
            <Card.Title
              style={{ fontFamily: "MontserratSemiBold", fontSize: 10 }}
            >
              Items
            </Card.Title>
            <View
              style={{
                position: "relative",
                alignItems: "center",
                // marginTop: 17,
              }}
            >
              <FontAwesome5 name="clipboard-list" size={12} color="#5cb1ff" />
            </View>
          </Card>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("cartegories")}>
          <Card
            containerStyle={{
              width: 80,
              height: 80,
              backgroundColor: "#dcffee",
            }}
          >
            <Card.Title
              style={{ fontFamily: "MontserratSemiBold", fontSize: 10 }}
            >
              Cartegories
            </Card.Title>
            <View
              style={{
                position: "relative",
                alignItems: "center",
                // marginTop: 12,
              }}
            >
              <MaterialIcons name="post-add" size={12} color="#5cb1ff" />
            </View>
          </Card>
        </Pressable>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <Pressable onPress={() => navigation.navigate("specialOffers")}>
          <Card
            containerStyle={{
              width: 80,
              height: 80,
              backgroundColor: "#dcffee",
            }}
          >
            <Card.Title
              style={{ fontFamily: "MontserratSemiBold", fontSize: 10 }}
            >
              Special Offers
            </Card.Title>
            <View style={{ position: "relative", alignItems: "center" }}>
              <MaterialIcons name="local-offer" size={12} color="#5cb1ff" />
            </View>
          </Card>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("settings")}>
          <Card
            containerStyle={{
              width: 80,
              height: 80,
              backgroundColor: "#dcffee",
            }}
          >
            <Card.Title
              style={{ fontFamily: "MontserratSemiBold", fontSize: 10 }}
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
              <Ionicons name="ios-settings" size={12} color="#5cb1ff" />
            </View>
          </Card>
        </Pressable>
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
