import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TokenWithBalance } from "services/types";
import icon from "assets/icons/wallets/unknown.svg";
import { chainIDs } from "constants/chainIDs";

export type TerraWalletIDs =
  | "terra_wc"
  | "station"
  | "xdefi-wallet"
  | "leap-wallet"
  | "SafePal"
  | "torus";

export type WalletInfo = {
  icon: string;
  displayCoin: { amount: number; symbol: string };
  coins: TokenWithBalance[];
  address: string;
  chainId: string;
  id: TerraWalletIDs | undefined;
};

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
