import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import NewOrders from "../HomeScreens/NewOrders";
import OrdersInProgress from "../HomeScreens/OrdersInProgress";
import SettingScreen from "../HomeScreens/Settings";
import OrderHistoryScreen from "../HomeScreens/OrderHistory";
import { createStackNavigator } from "@react-navigation/stack";
import ReadyForPickUp from "../HomeScreens/ReadyForPickUp";
import EditName from "../Edit/EditName";
import { Dimensions, Text, View } from "react-native";
import { colors } from "../config";
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import DetailedOrder from "../StackScreens/DetailedOrder";
import InProgressDetailed from "../StackScreens/InProgressDetailed";
import CreateACartegory from "../Settings/CreateACartegory";
import CreateNewDish from "../Settings/CreateNewDish";
import Help from "../Settings/Help";
import Settings from "../Settings/Settings";
import SpecialOffers from "../Settings/SpecialOffers";
import { Ionicons } from "@expo/vector-icons";
import ItemList from "../Settings/ItemList";
import Cartegories from "../Settings/Cartegories";

function DrawerNav({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      id="LeftDrawer"
      screenOptions={{
        drawerType: "permanent",
        drawerPosition: "left",
        headerShown: false,
        drawerContentContainerStyle: {
          marginTop: 100,
          justifyContent: "center",
          alignContent: "space-around",
          //alignItems: "center",
        },

        drawerContentStyle: {
          // backgroundColor: "#279eff",
          // backgroundColor: "#6e6eff",
          backgroundColor: "#1880ff",
        },

        drawerStyle: {
          // backgroundColor: "indigo",
          width: windowWidth / 12,
        },
      }}
      initialRouteName="entry"
    >
      <Drawer.Screen
        options={{
          title: "",
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name="fiber-new"
              size={50}
              color={focused ? "white" : "rgba(39, 39, 39, 1)"}
            />
          ),
        }}
        name="New Orders"
        component={NewOrders}
      />
      <Drawer.Screen
        options={{
          // title: "",
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="progress-clock"
              size={50}
              color={focused ? "white" : "rgba(39, 39, 39, 1)"}
            />
          ),
        }}
        name="Orders in progress"
        component={OrdersInProgress}
      />
      <Drawer.Screen
        options={{
          title: "",
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="food-turkey"
              size={50}
              color={focused ? "white" : "rgba(39, 39, 39, 1)"}
            />
          ),
        }}
        name="Order Ready For PickUp"
        component={ReadyForPickUp}
      />
      <Drawer.Screen
        options={{
          title: "",
          drawerIcon: ({ focused }) => (
            <FontAwesome5
              name="history"
              size={50}
              color={focused ? "white" : "rgba(39, 39, 39, 1)"}
            />
          ),
        }}
        name="Order History"
        component={OrderHistoryScreen}
      />
      <Drawer.Screen
        options={{
          title: "",
          drawerIcon: ({ focused }) => (
            <Feather
              name="settings"
              size={50}
              color={focused ? "white" : "rgba(39, 39, 39, 1)"}
            />
          ),
        }}
        name="Settings"
        component={SettingScreen}
      />
    </Drawer.Navigator>
  );
}

export default function StackNav() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animationTypeForReplace: "pop",
        }}
      >
        <Stack.Screen
          name="draw"
          component={DrawerNav}
          options={{
            headerShown: false,
            animationTypeForReplace: "pop",
            title: "Home",
          }}
        />
        <Stack.Screen
          name="edit"
          component={EditName}
          options={{ headerShown: false, animationTypeForReplace: "pop" }}
        />
        <Stack.Screen
          name="detailedOrder"
          component={DetailedOrder}
          options={{ animationTypeForReplace: "pop", title: "New order" }}
        />
        <Stack.Screen
          name="inProgressDetailed"
          component={InProgressDetailed}
          options={{
            animationTypeForReplace: "pop",
            title: "Ready For Pickup",
          }}
        />
        <Stack.Screen
          name="cartegories"
          component={Cartegories}
          options={{
            animationTypeForReplace: "pop",
            title: "Cartegories",
          }}
        />
        <Stack.Screen
          name="createACartegory"
          component={CreateACartegory}
          options={{
            animationTypeForReplace: "pop",
            title: "New Cartegory",
          }}
        />
        <Stack.Screen
          name="createNewDish"
          component={CreateNewDish}
          options={{
            animationTypeForReplace: "pop",
            title: "New Item",
          }}
        />
        <Stack.Screen
          name="itemList"
          component={ItemList}
          options={{
            animationTypeForReplace: "pop",
            title: "Items",
            headerRight: () => (
              <View
                style={{
                  alignItems: "stretch",
                  flexDirection: "row",
                  backgroundColor: "#dcffee",
                  marginRight: 16,
                }}
              >
                <Ionicons
                  name="search"
                  size={28}
                  color="black"
                  style={{
                    marginRight: 30,
                    padding: 10,
                  }}
                />
                <Ionicons
                  name="add-sharp"
                  size={40}
                  color="black"
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    paddingTop: 4,
                    padding: 8,
                  }}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="help"
          component={Help}
          options={{
            animationTypeForReplace: "pop",
            title: "Help",
          }}
        />
        <Stack.Screen
          name="settings"
          component={Settings}
          options={{
            animationTypeForReplace: "pop",
            title: "Settings",
          }}
        />
        <Stack.Screen
          name="specialOffers"
          component={SpecialOffers}
          options={{
            animationTypeForReplace: "pop",
            title: "Special Offers",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
