import { useSelector } from "react-redux";
import { cartegoryActions } from "./cartegorySlice";
import { dfhs } from "@env";

export const fetchCartegories = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(`${dfhs}restaurants`);
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
