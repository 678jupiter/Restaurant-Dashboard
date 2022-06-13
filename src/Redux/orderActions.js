import { orderActions } from "./ordersSlice";

export const fetchOrders = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch("http://localhost:1337/api/restaurant-orders");
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
