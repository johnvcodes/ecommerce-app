import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  darkMode: boolean;
};

const LOCAL_STORAGE_THEME_KEY = "theme";

function getStorageTheme() {
  if (
    localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === "dark" ||
    (!localStorage.getItem(LOCAL_STORAGE_THEME_KEY) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return true;
  }
  return false;
}

const initialState: ThemeState = {
  darkMode: getStorageTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      const draft = state;
      draft.darkMode = !state.darkMode;
      return draft;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
