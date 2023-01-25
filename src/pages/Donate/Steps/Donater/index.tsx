import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { WithWallet } from "contexts/WalletContext/types";
import { TokenWithAmount } from "types/slices";
import { FormStep } from "slices/donation";
import Form from "./Form";
import { schema } from "./schema";

export default function Donater({ wallet, ...state }: WithWallet<FormStep>) {
  const _tokens: TokenWithAmount[] = wallet.coins.map((t) => ({
    ...t,
    amount: "0",
  }));

  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: state.details || {
      token: _tokens[0],
      pctLiquidSplit: "0",

      //meta
      tokens: _tokens,
      chainName: wallet.chain.chain_name,
      chainId: wallet.chain.chain_id,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
