import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// this is a temporary solution.
// TODO: use new wallet logic after https://github.com/AngelProtocolFinance/angelprotocol-web-app/issues/655 is done
type State = {
  connectedWalletAddress: string;
};

const initialState: State = {
  connectedWalletAddress: "",
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setConnectedWallet: (state, { payload }: PayloadAction<string>) => {
      state.connectedWalletAddress = payload;
    },
  },
});

export default registrationSlice.reducer;
export const { setConnectedWallet } = registrationSlice.actions;
