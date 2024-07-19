import { configureStore, createSlice } from "@reduxjs/toolkit";

const wordsSlice = createSlice({
  name: "words",
  initialState: {
    words: [],
    search: "",
  },
  reducers: {
    setWords(state, action) {
      state.words = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const { setWords, setSearch } = wordsSlice.actions;

const store = configureStore({
  reducer: {
    words: wordsSlice.reducer,
  },
});

export default store;
