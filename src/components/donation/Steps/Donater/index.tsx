import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { TokenWithAmount as TWA } from "types/tx";
import { DonaterConfigFromWidget } from "types/widget";
import { FormStep, WithWallet } from "slices/donation";
import Form from "./Form";
import { schema } from "./schema";

type Props = WithWallet<FormStep> & {
  config: DonaterConfigFromWidget | null;
};

export default function Donater({ wallet, config, ...state }: Props) {
  const _tokens: TWA[] = wallet.coins.map<TWA>((t) => ({
    ...t,
    amount: "0",
  }));

  const initCoin = _tokens[0];

  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    values: state.details || {
      token: initCoin,
      pctLiquidSplit: config?.liquidSplitPct ?? 50,

      //meta
      // if availCurrs array was not set, include all
      // otherwise, include only tokens in the availCurrs array + the fee-paying coin
      chainName: wallet.chain.chain_name,
      chainId: wallet.chain.chain_id,
      userOptForKYC: false,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form configFromWidget={config} tokens={_tokens} />
    </FormProvider>
  );
}
