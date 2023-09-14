import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WidgetConfig } from "types/widget";

type State = WidgetConfig;

const initialState: State = {
  endowment: { id: 0, name: "Select endowment" },
  isDescriptionTextShown: true,
  advancedOptions: {
    display: "collapsed",
    liquidSplitPct: 50,
  },
  tokens: [],
};

const widget = createSlice({
  name: "widget",
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<State>) => payload,
  },
});

export default widget.reducer;
export const { update: updateWidgetConfig } = widget.actions;
