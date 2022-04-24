import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CWContracts } from "types/server/contracts";

const initialState: { cwContracts: CWContracts } = { cwContracts: {} };

const cwContractsSlice = createSlice({
  name: "admin/cwContracts",
  initialState,
  reducers: {
    setCWContracts: (state, { payload }: PayloadAction<CWContracts>) => {
      state.cwContracts = payload;
    },
  },
});

export default cwContractsSlice.reducer;
export const { setCWContracts } = cwContractsSlice.actions;
