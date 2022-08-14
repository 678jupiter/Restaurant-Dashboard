import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, StatusBar } from "react-native";
import StackNav from "./src/Drawer";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store, { persistor } from "./src/Redux/store";
import { PersistGate } from "redux-persist/es/integration/react";
import FlashMessage from "react-native-flash-message";
import { GETTY } from "@env";
import * as NavigationBar from "expo-navigation-bar";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useEffect } from "react";

export default function App() {
  const hidebar = async () => {
    const visibility = await NavigationBar.setVisibilityAsync("hidden");
  };
  useEffect(() => {
    hidebar();
  }, []);

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
              <StackNav />
            </ApolloProvider>
          </PersistGate>
          <StatusBar barStyle="light-content" backgroundColor="black" />
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
