import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { Values } from "./types";

export default function MemberUpdator(props: { children: ReactNode }) {
  const methods = useForm<Values>({
    reValidateMode: "onChange",
    defaultValues: {
      addr: "",
      weight: "1",
    },
    resolver: yupResolver(schema),
  });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
