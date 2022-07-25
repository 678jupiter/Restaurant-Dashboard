import { orderActions } from "./ordersSlice";
import { dfhs } from "@env";
import { Alert } from "react-native";

export const fetchOrders = () => {
  console.log("Redux fetch");
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(`${dfhs}restaurant-orders`);
      const data = await res.json();
      return data;
    };
    try {
      const restaurantData = await fetchHandler();
      dispatch(orderActions.getOrders(restaurantData));
    } catch (error) {
      if (error.message === "Network request failed") {
        console.log("good error");

        Alert.alert("Opps. Your device is not connected to the Internet");
      }
    }
  };
};
