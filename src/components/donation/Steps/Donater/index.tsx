import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { TokenWithAmount } from "types/slices";
import { WithWallet } from "contexts/WalletContext";
import { FormStep } from "slices/donation";
import { isEmpty } from "helpers";
import { ConfigParams } from "..";
import Form from "./Form";
import { schema } from "./schema";

export default function Donater({
  wallet,
  config: {
    availCurrs = [],
    hideAdvOpts = false,
    liquidPct = 0,
    unfoldAdvOpts = false,
  },
  ...state
}: WithWallet<FormStep> & { config: ConfigParams }) {
  const _tokens: TokenWithAmount[] = wallet.coins.map((t) => ({
    ...t,
    amount: "0",
  }));

  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: state.details || {
      token: wallet.displayCoin,
      pctLiquidSplit: `${liquidPct}`,

      //meta
      // if availCurrs array was not set, include all
      // otherwise, include only tokens in the availCurrs array + the fee-paying coin
      tokens: isEmpty(availCurrs)
        ? _tokens
        : _tokens.filter(
            (token) =>
              availCurrs.includes(token.symbol) ||
              wallet.displayCoin.symbol === token.symbol
          ),
      chainName: wallet.chain.chain_name,
      chainId: wallet.chain.chain_id,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form hideAdvOpts={hideAdvOpts} unfoldAdvOpts={unfoldAdvOpts} />
    </FormProvider>
  );
}
