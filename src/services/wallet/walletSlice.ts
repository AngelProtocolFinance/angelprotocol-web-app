<<<<<<< HEAD
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import icon from "assets/icons/wallets/unknown.svg";
import { chainIDs } from "constants/chainIDs";
=======
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import icon from "assets/icons/wallets/unknown.svg";
import { chainIDs } from "constants/chainIDs";
import { MAIN_DENOM } from "constants/currency";
>>>>>>> master
import { State, WalletInfo } from "./types";

const initialState: State = {
  isUpdating: false,
  displayCoin: {
    amount: 0,
<<<<<<< HEAD
    symbol: "UST",
=======
    denom: MAIN_DENOM,
>>>>>>> master
  },
  coins: [],
  icon: icon,
  address: "walletaddrs",
  id: undefined,
<<<<<<< HEAD
  chainId: chainIDs.terra_main,
=======
  chainId: chainIDs.terra_classic,
>>>>>>> master
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
<<<<<<< HEAD
    resetWallet: (state) => initialState,
=======
    resetWallet: () => initialState,
>>>>>>> master
    setWalletDetails: (state, { payload }: PayloadAction<WalletInfo>) => {
      state.icon = payload.icon;
      state.displayCoin = payload.displayCoin;
      state.coins = payload.coins;
      state.address = payload.address;
      state.chainId = payload.chainId;
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
