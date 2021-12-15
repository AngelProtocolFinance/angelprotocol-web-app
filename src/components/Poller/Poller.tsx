import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { Values } from "./types";

export default function Poller(props: { children: ReactNode }) {
  const methods = useForm<Values>({
    reValidateMode: "onChange",
    defaultValues: {
      amount: (10_000).toString(),
    },
    resolver: yupResolver(schema),
  });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
