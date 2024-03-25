import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WidgetConfig } from "types/widget";

type State = WidgetConfig & { initial: WidgetConfig };

const initial: WidgetConfig = {
  endowment: { id: 0, name: "", hide_bg_tip: false },
  isDescriptionTextShown: true,
  isSplitDisabled: false,
  liquidSplitPct: 50,
};

const initialState: State = {
  initial,
  ...initial,
};

const widget = createSlice({
  name: "widget",
  initialState,
  reducers: {
    initialize: (_, { payload }: PayloadAction<WidgetConfig>) => ({
      initial: payload,
      ...payload,
    }),
    update: (state, { payload }: PayloadAction<WidgetConfig>) => ({
      initial: state.initial,
      ...payload,
    }),
    reset: (state) => ({ initial: state.initial, ...state.initial }),
  },
});

export default widget.reducer;
export const { initialize, update, reset } = widget.actions;
