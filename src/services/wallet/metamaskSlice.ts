import { createSlice } from "@reduxjs/toolkit";
import { denoms } from "constants/currency";
import { EthIdentifiers } from "./types";
import { chainIDs } from "constants/chainIDs";

const initialState = {
  connected: false,
  network: "homestead",
  id: EthIdentifiers.metamask,
  icon: "/images/icons/metamask.png",
  displayCoin: { amount: 0, denom: denoms.ether },
  balance: 0,
  coins: [],
  address: "",
  chainId: chainIDs.eth_main,
  supported_denoms: [denoms.ether],
};

const metamaskSlice = createSlice({
  name: "metamask",
  initialState,
  reducers: {
    resetState: (state) => {
      state = initialState;
    },
    setMetamaskStatus: (state, { payload }: any) => {
      state.connected = payload.connected;
      state.icon = payload.icon;
      state.network = payload.network;
      state.address = payload.address;
      state.chainId = payload.chainId;
      state.balance = payload.balance;
      state.coins = payload.coins;
    },
  },
});

export default metamaskSlice.reducer;
export const { resetState, setMetamaskStatus } = metamaskSlice.actions;
