import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { TStrategy } from "types/aws";
import { TokenWithAmount } from "types/slices";
import Form from "./Form";
import { schema } from "./schema";

export default function Investor(props: TStrategy) {
  const balances = {
    locked: 5,
    liquid: 5,
  };
  const token: TokenWithAmount = {
    approved: true,
    decimals: 6,
    logo: "", //not used
    min_donation_amnt: 0.01,
    name: "", //not used
    symbol: "USDC",
    token_id: "uusd",
    type: "juno-native",
    amount: "0",
    balance: balances.liquid,
  };

  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      type: "liquid",
      lockPeriod: "1",
      token,
      tokens: [token],
      //meta
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form {...props} />
    </FormProvider>
  );
}
