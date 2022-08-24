import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { SwapValues } from "./types";
import { SchemaShape } from "schemas/types";
import { requiredTokenAmount } from "schemas/number";
import SwapForm from "./Form";

const shape: SchemaShape<SwapValues> = { amount: requiredTokenAmount };
const schema = Yup.object().shape(shape);

export default function Swapper() {
  const methods = useForm<SwapValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      is_buy: true,
      slippage: "1.0",
      //metadata
      return_amount: "0.00",
      pct_commission: "0.00",
      ratio: 0,
    },
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <SwapForm />
    </FormProvider>
  );
}
