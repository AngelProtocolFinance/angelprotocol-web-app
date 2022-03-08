import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { fundDestroyerSchema, FundDestroyValues } from "./fundDestroyerSchema";

export default function FundDestroyer(props: { children: ReactNode }) {
  const methods = useForm<FundDestroyValues>({
    resolver: yupResolver(fundDestroyerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      fundId: "",
    },
  });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
