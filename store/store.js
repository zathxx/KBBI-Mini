import { configureStore, createSlice } from "@reduxjs/toolkit";

const wordsSlice = createSlice({
  name: "words",
  initialState: [],
  reducers: {
    setWords(state, action) {
      return action.payload;
    },
  },
});

export const { setWords } = wordsSlice.actions;

const store = configureStore({
  reducer: {
    words: wordsSlice.reducer,
  },
});

export default store;
