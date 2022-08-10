import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, StatusBar, Platform } from "react-native";
import StackNav from "./src/Drawer";
import { useFonts } from "expo-font";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { persistor } from "./src/Redux/store";
import { PersistGate } from "redux-persist/es/integration/react";
import SocketNav from "./Socket/Nav/navi";
import FlashMessage from "react-native-flash-message";
import io from "socket.io-client";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { GETTY, socks } from "@env";
import * as NavigationBar from "expo-navigation-bar";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { colors } from "./config";
import Push from "./lib/Push";
import { useEffect } from "react";
import EditArray from "./EditArray";
import Layout from "./Layout";
import Time from "./Time";
import FakeApp from "./FakeApp";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const hidebar = async () => {
    const visibility = await NavigationBar.setVisibilityAsync("hidden");
  };
  useEffect(() => {
    hidebar();
  }, []);

  const socket = io(`${socks}`);
  function showRoom() {
    console.log("Joined orders Room");
  }
  // recieving instructions from my backend
  useEffect(() => {
    let isCancelled = false;
    const hookup = async () => {
      const input = "orders_room";
      socket.emit("enter_new_order", input, showRoom);
    };
    hookup();
    return () => {
      isCancelled = true;
    };
  }, []);
  function addMessage(message) {
    console.log(message);
    schedulePushNotification(); // New order
  }

  socket.on("new_placed_orders", addMessage);
  socket.on("bye", () => {
    console.log("Rest left ");
  });

  const client = new ApolloClient({
    uri: `${GETTY}graphql`,
    cache: new InMemoryCache(),
  });
  const [loaded] = useFonts({
    CircularStdBold: require("./assets/fonts/CircularStdBold.ttf"),
    CircularStdBook: require("./assets/fonts/CircularStdBook.ttf"),
    CircularStdMedium: require("./assets/fonts/CircularStdMedium.ttf"),
    MontserratItalic: require("./assets/fonts/MontserratItalic.ttf"),
    MontserratSemiBold: require("./assets/fonts/MontserratSemiBold.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ApolloProvider client={client}>
              {/* <StackNav /> */}
              <FakeApp />
            </ApolloProvider>
          </PersistGate>
          <StatusBar barStyle="light-content" backgroundColor="black" />
        </Provider>
        <FlashMessage position="top" />
      </SafeAreaProvider>
    </>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New Order Confimation",
      body: "You have a new order",
      data: { data: "goes here" },
      sound: true,
    },
    trigger: { seconds: 1, repeats: false },
  });
  //await Notifications.cancelScheduledNotificationAsync(identifier);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
