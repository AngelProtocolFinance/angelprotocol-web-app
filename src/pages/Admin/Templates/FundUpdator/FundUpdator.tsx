import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { fundDestroyerSchema, FundUpdateValues } from "./fundUpdatorSchema";

export default function FundUpdator(props: { children: ReactNode }) {
  const methods = useForm<FundUpdateValues>({
    resolver: yupResolver(fundDestroyerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      fundId: "",
    },
  });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
