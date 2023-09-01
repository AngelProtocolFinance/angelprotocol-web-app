import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { TokenWithAmount as TWA } from "types/slices";
import { FormStep, WithWallet, fiatWallet, isFiat } from "slices/donation";
import { isEmpty } from "helpers";
import { IS_AST } from "constants/env";
// import { fiatTokens } from "constants/tokens";
import { ConfigParams } from "..";
import Form from "./Form";
import { schema } from "./schema";

export default function Donater({
  wallet,
  config: {
    availCurrs = [],
    hideAdvOpts = false,
    liquidPct = IS_AST ? 100 : 0,
    unfoldAdvOpts = false,
  },
  ...state
}: WithWallet<FormStep> & { config: ConfigParams }) {
  const fiats: TWA[] = fiatWallet.tokens.map((t) => ({
    ...t,
    amount: "0",
    approved: true,
    decimals: 0,
    name: "",
    token_id: t.symbol,
    balance: Number.MAX_VALUE,
    type: "fiat",
  }));

  const _tokens: TWA[] = isFiat(wallet)
    ? fiats
    : wallet.coins
        .map<TWA>((t) => ({
          ...t,
          amount: "0",
        }))
        .concat(fiats);

  const initCoin = _tokens[0];

  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    values: state.details || {
      token: initCoin,
      pctLiquidSplit: liquidPct,

      country: {
        name: "",
        flag: "",
        code: "",
      },

      //meta
      // if availCurrs array was not set, include all
      // otherwise, include only tokens in the availCurrs array + the fee-paying coin
      tokens: isEmpty(availCurrs)
        ? _tokens
        : _tokens.filter(
            (token) =>
              availCurrs.includes(token.symbol) ||
              initCoin.symbol === token.symbol
          ),
      chainName: isFiat(wallet) ? "" : wallet.chain.chain_name,
      chainId: isFiat(wallet) ? "" : wallet.chain.chain_id,
      userOptForKYC: false,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form hideAdvOpts={hideAdvOpts} unfoldAdvOpts={unfoldAdvOpts} />
    </FormProvider>
  );
}
