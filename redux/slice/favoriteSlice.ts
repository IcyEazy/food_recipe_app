import {
  PayloadAction,
  PayloadActionCreator,
  createSlice,
} from "@reduxjs/toolkit";

interface FavoriteState {
  favorites: any[];
}

const initialState: FavoriteState = {
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item?.idMeal !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export const getAllFavorites = (state: any) => state.favorite.favorites;
export default favoriteSlice.reducer;
