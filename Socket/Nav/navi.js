import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Joinroom from "../screens/joinroom";
import Room from "../screens/room";
const Stack = createStackNavigator();

export default function SocketNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            borderBottomColor: "black",
          },
          headerTintColor: "#FFFFFF",
          headerBackTitleVisible: false,
        }}
        initialRouteName="joinroom"
      >
        <Stack.Screen
          name="joinroom"
          component={Joinroom}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="room" component={Room} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
