import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { Vault } from "services/types";
import { TokenWithAmount } from "types/slices";
import Form from "./Form";
import { schema } from "./schema";

export default function Investor(v: Vault) {
  const token: TokenWithAmount = {
    approved: true,
    decimals: 6,
    logo: "", //not used
    min_donation_amnt: 0.01,
    name: "", //not used
    symbol: v.symbol,
    token_id: v.input_denom,
    type: "juno-native",
    amount: "0",
    balance: v.balance,
  };

  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      token,
      tokens: [token],
      //meta
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form {...v} />
    </FormProvider>
  );
}
