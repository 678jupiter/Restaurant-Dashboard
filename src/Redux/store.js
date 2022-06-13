import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import ordersSlice from "./ordersSlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import itemsSlice from "./itemsSlice";
import cartegorySlice from "./cartegorySlice";

const persistConfig = {
  key: "reym",
  storage: AsyncStorage,
};

const reducers = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  orders: ordersSlice.reducer,
  items: itemsSlice.reducer,
  cartegories: cartegorySlice.reducer,
});

const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export default store;
