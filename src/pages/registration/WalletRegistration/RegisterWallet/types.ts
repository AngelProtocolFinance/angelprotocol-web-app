import * as Yup from "yup";

export const WalletSchema = Yup.object().shape({
  walletAddress: Yup.string().required("Please enter your wallet address."),
});

export type Values = { walletAddress: string };
