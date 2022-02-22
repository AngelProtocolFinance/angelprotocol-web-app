import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { Props, SwapValues } from "./types";

export default function Swapper(props: Props) {
  const methods = useForm<SwapValues>({
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
      <props.Form />
    </FormProvider>
  );
}
