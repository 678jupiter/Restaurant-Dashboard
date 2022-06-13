import { itemsActions } from "./itemsSlice";

export const fetchItems = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch("http://localhost:1337/api/dishes");
      const data = await res.json();
      return data;
    };
    try {
      const restaurantDishs = await fetchHandler();
      dispatch(itemsActions.getItems(restaurantDishs));
    } catch (error) {
      console.log(error);
    }
  };
};
