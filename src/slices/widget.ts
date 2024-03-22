import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WidgetConfig } from "types/widget";

type State = WidgetConfig;

const initialState: State = {
  endowment: { id: 0, name: "", hide_bg_tip: false },
  isDescriptionTextHidden: false,
  isSplitFixed: false,
  liquidSplitPct: 50,
};

const widget = createSlice({
  name: "widget",
  initialState,
  reducers: {
    updateWidgetConfig: (_, { payload }: PayloadAction<State>) => payload,
    resetWidgetConfig: () => initialState,
  },
});

export default widget.reducer;
export const { updateWidgetConfig, resetWidgetConfig } = widget.actions;
