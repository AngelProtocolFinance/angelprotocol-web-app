import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { fundDestroyerSchema, FundCreatorValues } from "./fundDestroyerSchema";

export default function FundDestroyer(props: { children: ReactNode }) {
  const methods = useForm<FundCreatorValues>({
    resolver: yupResolver(fundDestroyerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
