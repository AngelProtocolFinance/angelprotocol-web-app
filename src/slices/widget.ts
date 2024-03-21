import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WidgetConfig } from "types/widget";

type State = WidgetConfig;

const initialState: State = {
  endowment: { id: 0, name: "Nonprofit name" },
  liquidSplitPct: 50,
};

const widget = createSlice({
  name: "widget",
  initialState,
  reducers: {
    update: (_, { payload }: PayloadAction<State>) => payload,
    reset: () => initialState,
  },
});

export default widget.reducer;
export const { update: updateWidgetConfig, reset: resetWidgetConfig } =
  widget.actions;
