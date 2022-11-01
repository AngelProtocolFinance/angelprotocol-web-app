import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { WithWallet } from "contexts/WalletContext";
import { placeholderChain } from "contexts/WalletContext/constants";
import { FormStep, TokenWithAmount } from "slices/donation";
import Form from "./Form";
import { schema } from "./schema";

export default function Donater({
  wallet: { chain },
  ...state
}: WithWallet<FormStep>) {
  const { tokens } = chain;
  const _tokens: TokenWithAmount[] =
    tokens.length > 0
      ? tokens.map((t) => ({ ...t, amount: "0" }))
      : placeholderChain.tokens.map((t) => ({ ...t, amount: "0" }));

  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: state.details || {
      token: _tokens[0],
      pctLiquidSplit: "0",

      //meta
      tokens: _tokens,
      chainName: chain.chain_name,
      chainId: chain.chain_id,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
