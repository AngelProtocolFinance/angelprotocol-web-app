import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { WidgetConfig } from "types/widget";

type State = WidgetConfig;

const initialState: State = {
  endowment: { id: 0, name: "", hide_bg_tip: false },
  isDescriptionTextShown: true,
  splitDisabled: false,
  liquidSplitPct: 50,
};

const widget = createSlice({
  name: "widget",
  initialState,
  reducers: {
    initialize: (_, { payload }: PayloadAction<WidgetConfig>) => ({
      initial: payload,
      ...payload,
    }),
    update: (_, { payload }: PayloadAction<WidgetConfig>) => payload,
    reset: (state) => ({ ...initialState, endowment: state.endowment }),
  },
});

export default widget.reducer;
export const { initialize, update, reset } = widget.actions;
