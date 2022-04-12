import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CWContracts } from "contracts/Admin";

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
