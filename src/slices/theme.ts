import { createSlice } from "@reduxjs/toolkit";
import { Theme, isPrevDark, setToDarkMode, setToLightMode } from "helpers";

const initialState: Theme = isPrevDark ? "dark" : "light";

const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      if (state === "dark") {
        setToLightMode();
        return "light";
      } else {
        setToDarkMode();
        return "dark";
      }
    },
  },
});

export default theme.reducer;
export const { toggle } = theme.actions;
