import * as Yup from "yup";

export const WalletSchema = Yup.object().shape({
  wallet_number: Yup.string().required("Please enter your wallet address."),
});

export type Values = { wallet_number: string };
