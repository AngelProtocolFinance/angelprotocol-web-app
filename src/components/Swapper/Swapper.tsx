import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { Values } from "./types";

export default function Swapper(props: { children: ReactNode }) {
  const methods = useForm<Values>({
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      is_buy: true,

      //metadata
      return_amount: "0.00",
      pct_change: "0.00",
      pct_commission: "0.00",
    },
    resolver: yupResolver(schema),
  });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
