import { itemsActions } from "./itemsSlice";
import { dfhs } from "@env";
import { useSelector } from "react-redux";

export const fetchItems = () => {
  console.log("");

  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(`${dfhs}dishes`);
      const data = await res.json();
      return data;
    };
    try {
      const restaurantDishs = await fetchHandler();
      dispatch(itemsActions.getItems(restaurantDishs));
    } catch (error) {}
  };
};
