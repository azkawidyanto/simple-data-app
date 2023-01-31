import { createSlice } from '@reduxjs/toolkit';

export const catSlice = createSlice({
  name: 'cat',
  initialState: {
    cats: [],
  },
  reducers: {
    storeCats: (state, action) => {
      state.cats = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeCats } = catSlice.actions;

export default catSlice.reducer;
