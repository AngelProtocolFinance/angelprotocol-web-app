import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import icon from "assets/icons/wallets/unknown.svg";
import { chainIDs } from "constants/chainIDs";
import { State, WalletInfo } from "./types";

const initialState: State = {
  isUpdating: false,
  displayCoin: {
    amount: 0,
    symbol: "UST",
  },
  coins: [],
  icon: icon,
  address: "walletaddrs",
  supported_denoms: [],
  id: undefined,
  chainId: chainIDs.mainnet,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    resetWallet: (state) => {
      state = initialState;
    },
    setWalletDetails: (state, { payload }: PayloadAction<WalletInfo>) => {
      state.icon = payload.icon;
      state.displayCoin = payload.displayCoin;
      state.coins = payload.coins;
      state.address = payload.address;
      state.chainId = payload.chainId;
      state.supported_denoms = payload.supported_denoms;
      state.id = payload.id;
    },
    setIsUpdating: (state, { payload }: PayloadAction<boolean>) => {
      state.isUpdating = payload;
    },
  },
});

export default walletSlice.reducer;
export const { setIsUpdating, setWalletDetails, resetWallet } =
  walletSlice.actions;
