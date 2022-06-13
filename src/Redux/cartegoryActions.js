import { cartegoryActions } from "./cartegorySlice";

export const fetchCartegories = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch("http://localhost:1337/api/restaurants");
      const data = await res.json();
      return data;
    };
    try {
      const restaurantCartegories = await fetchHandler();
      dispatch(cartegoryActions.getCartegories(restaurantCartegories));
    } catch (error) {
      console.log(error);
    }
  };
};
