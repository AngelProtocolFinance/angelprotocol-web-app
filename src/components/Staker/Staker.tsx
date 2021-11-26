import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { Values } from "components/Donater/types";

export default function Staker(props: { children: ReactNode }) {
  const methods = useForm<Values>({
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",

      //metadata
      loading: false,
      form_error: "",
      fee: 0,
    },
    resolver: yupResolver(schema),
  });
  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
