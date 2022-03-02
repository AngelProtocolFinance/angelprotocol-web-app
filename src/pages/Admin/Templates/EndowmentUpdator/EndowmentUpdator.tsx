import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  endowmentUpdateSchema,
  EndowmentUpdateValues,
} from "./endowmentUpdateSchema";

export default function EndowmentUpdator(props: { children: ReactNode }) {
  const methods = useForm<EndowmentUpdateValues>({
    resolver: yupResolver(endowmentUpdateSchema),
    defaultValues: {
      addr: "",
    },
  });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
