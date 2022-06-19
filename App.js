import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, StatusBar, View } from "react-native";
import StackNav from "./src/Drawer";
import { useFonts } from "expo-font";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { persistor } from "./src/Redux/store";
import { PersistGate } from "redux-persist/es/integration/react";
import SocketNav from "./Socket/Nav/navi";
import FlashMessage from "react-native-flash-message";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { colors } from "./config";

export default function App() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
