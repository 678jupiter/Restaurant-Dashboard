import { orderActions } from "./ordersSlice";
import { dfhs } from "@env";

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
      console.log(error);
    }
  };
};
