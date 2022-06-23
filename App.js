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
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const socket = io("https://8d65-197-156-137-184.in.ngrok.io");
  function showRoom() {
    console.log("Joined Room");
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

  const client = new ApolloClient({
    uri: "http://localhost:1337/graphql",
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
              <StackNav />
              {/* <SocketNav /> */}
              {/* <Push /> */}
            </ApolloProvider>
          </PersistGate>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={colors.light_gray}
            translucent
          />
        </Provider>
        <FlashMessage position="top" />
      </SafeAreaProvider>
    </>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
      sound: true,
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
