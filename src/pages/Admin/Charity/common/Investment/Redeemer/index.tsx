import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { TokenWithAmount } from "types/tx";
import Form from "./Form";
import { schema } from "./schema";

export default function Redeemer() {
  const token: TokenWithAmount = {
    approved: true,
    decimals: 6,
    logo: "", //not used
    min_donation_amnt: 0.01,
    name: "", //not used
    symbol: "USD",
    token_id: "uusd",
    type: "juno-native",
    amount: "0",
    balance: 0,
    coingecko_denom: "",
  };

  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { token },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
