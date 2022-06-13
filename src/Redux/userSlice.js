import { createSlice } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";

const userSlice = createSlice({
  name: "user",
  initialState: {
    usermeta: [],
  },
  reducers: {
    addUser: (state, action) => {
      const newItem = action.payload;
      state.usermeta = action.payload;
    },
    middleware: [thunk, logger],
  },
});
export const userActions = userSlice.actions;
export default userSlice;
