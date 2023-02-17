import { FormStep } from "@/slices/gift";
import { IS_TEST, denoms } from "@ap/constants";
import { WithWallet } from "@ap/contexts/wallet-context";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { TokenWithAmount } from "@ap/types";
import Form from "./Form";
import { schema } from "./schema";

export default function Purchaser({
  classes = "",
  wallet,
  ...state
}: WithWallet<FormStep> & { classes?: string }) {
  const _tokens: TokenWithAmount[] = wallet.coins
    .filter((t) => IS_TEST || t.token_id === denoms.axlusdc)
    .map((t) => ({
      ...t,
      amount: "0",
    }));

  const methods = useForm<FormValues>({
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
