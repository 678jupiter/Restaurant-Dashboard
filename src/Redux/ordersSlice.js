import { createSlice } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    restaurantOrders: [],
  },
  reducers: {
    getOrders: (state, action) => {
      state.restaurantOrders = action.payload;
    },
    middleware: [thunk, logger],
  },
});

export const orderActions = ordersSlice.actions;
export default ordersSlice;
