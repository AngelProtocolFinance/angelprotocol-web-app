import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { WithWallet } from "contexts/WalletContext";
import { FormStep, TokenWithAmount } from "slices/gift";
import Form from "./Form";
import { schema } from "./schema";

export default function Purchaser({ wallet, ...state }: WithWallet<FormStep>) {
  const _tokens: TokenWithAmount[] = wallet.coins.map((t) => ({
    ...t,
    amount: "0",
  }));

  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: state.details || {
      token: _tokens[0],
      recipient: "",

      //meta
      tokens: _tokens,
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
