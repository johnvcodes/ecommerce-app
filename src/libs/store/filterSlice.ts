import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
  subFilter: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter(state, action: PayloadAction<string>) {
      const draft = state;
      if (draft.filter === action.payload) {
        draft.filter = "";
      } else {
        draft.filter = action.payload;
      }
      return draft;
    },
    changeSubFilter(state, action: PayloadAction<string>) {
      const draft = state;
      if (draft.subFilter === action.payload) {
        draft.subFilter = "";
      } else {
        draft.subFilter = action.payload;
      }
      return draft;
    },
  },
});

export const { changeFilter, changeSubFilter } = filterSlice.actions;

export default filterSlice.reducer;
