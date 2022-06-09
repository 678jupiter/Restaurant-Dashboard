import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNav from "./src/Drawer";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    CircularStdBold: require("./assets/fonts/CircularStdBold.ttf"),
    CircularStdBook: require("./assets/fonts/CircularStdBook.ttf"),
    CircularStdMedium: require("./assets/fonts/CircularStdMedium.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <>
      <SafeAreaProvider>
        <StackNav />
        <StatusBar barStyle="light" translucent backgroundColor="white" />
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
