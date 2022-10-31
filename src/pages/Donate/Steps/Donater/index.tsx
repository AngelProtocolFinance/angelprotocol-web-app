import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { Token } from "types/aws";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { placeholderChain } from "contexts/WalletContext/constants";
import { FormStep, TokenWithAmount } from "slices/donation";
import Form from "./Form";
import { schema } from "./schema";

export default function Donater({
  wallet,
  ...step1
}: FormStep & { wallet: WalletState }) {
  return <Context tokens={wallet.coins} state={step1} />;
}

function Context({ tokens, state }: { tokens: Token[]; state: FormStep }) {
  const _tokens: TokenWithAmount[] =
    tokens.length > 0
      ? tokens.map((t) => ({ ...t, amount: "0" }))
      : placeholderChain.tokens.map((t) => ({ ...t, amount: "0" }));

  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: state.details || {
      token: _tokens[0],
      tokens: _tokens,
      pctLiquidSplit: "0",
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
