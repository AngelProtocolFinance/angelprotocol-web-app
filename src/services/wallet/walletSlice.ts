import icon from "assets/icons/wallets/unknown.svg";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { denoms } from "constants/currency";
import { chainIDs } from "contracts/types";
import { State, Providers, WalletDetail } from "./types";

const initialState: State = {
  provider: Providers.none,
  isSwitching: false,
  isDetailsLoading: false,
  displayCoin: {
    amount: 0,
    denom: denoms.uusd,
  },
  coins: [],
  icon: icon,
  address: "walletaddrs",
  chainId: chainIDs.mainnet,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setProvider: (state, { payload }: PayloadAction<Providers>) => {
      state.provider = payload;
    },
    setWalletDetails: (
      state,
      {
        payload: { icon, displayCoin, coins, address, chainId },
      }: PayloadAction<WalletDetail>
    ) => {
      console.log("runs");
      state.icon = icon;
      state.displayCoin = displayCoin;
      state.coins = coins;
      state.address = address;
      state.chainId = chainId;
    },
    setIsSwitching: (state, { payload }: PayloadAction<boolean>) => {
      state.isSwitching = payload;
    },
    setIsUpdating: (state, { payload }: PayloadAction<boolean>) => {
      state.isDetailsLoading = payload;
    },
  },
});

export default walletSlice.reducer;
export const { setProvider, setIsSwitching, setIsUpdating, setWalletDetails } =
  walletSlice.actions;
