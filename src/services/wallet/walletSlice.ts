import icon from "assets/icons/wallets/unknown.svg";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { denoms } from "constants/currency";
import { chainIDs } from "constants/chainIDs";
import { WalletDetails, State } from "./types";

const initialState: State = {
  id: undefined,
  displayCoin: {
    amount: 0,
    denom: denoms.uusd,
  },
  coins: [],
  icon: icon,
  address: "walletaddrs",
  supported_denoms: [],
  chainId: chainIDs.mainnet,
  isUpdating: false,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    resetWallet: (state) => {
      state = initialState;
    },
    setWalletDetails: (state, { payload }: PayloadAction<WalletDetails>) => {
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
