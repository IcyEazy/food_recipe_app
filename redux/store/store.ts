import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../slice/favoriteSlice";

const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
