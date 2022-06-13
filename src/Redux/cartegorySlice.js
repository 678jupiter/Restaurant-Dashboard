import { createSlice } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";

const cartegorySlice = createSlice({
  name: "cartegories",
  initialState: {
    restaurantCartegories: [],
  },
  reducers: {
    getCartegories: (state, action) => {
      state.restaurantCartegories = action.payload;
    },
    middleware: [thunk, logger],
  },
});
export const cartegoryActions = cartegorySlice.actions;
export default cartegorySlice;
