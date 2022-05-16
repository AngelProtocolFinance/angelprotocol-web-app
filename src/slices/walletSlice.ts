import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WalletInfo } from "@types-slice/wallet";
import icon from "assets/icons/wallets/unknown.svg";
import { chainIDs } from "constants/chainIDs";

type IState = { isUpdating: boolean } & WalletInfo;

const initialState: IState = {
  isUpdating: false,
  displayCoin: {
    amount: 0,
    symbol: "UST",
  },
  coins: [],
  icon: icon,
  address: "walletaddrs",
  id: undefined,
  chainId: chainIDs.terra_main,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    resetWallet: (state) => initialState,
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
