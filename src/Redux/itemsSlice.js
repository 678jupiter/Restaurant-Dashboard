import { createSlice } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    restaurantDishes: [],
  },
  reducers: {
    getItems: (state, action) => {
      state.restaurantDishes = action.payload;
    },
    middleware: [thunk, logger],
  },
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice;
