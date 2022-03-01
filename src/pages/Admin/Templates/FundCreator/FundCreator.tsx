import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { fundCreatorSchema, FundCreatorValues } from "./fundCreatorSchema";

export const INIT_SPLIT = "-1";

export default function FundCreator(props: { children: ReactNode }) {
  const methods = useForm<FundCreatorValues>({
    resolver: yupResolver(fundCreatorSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "Create fund",
      splitToLiquid: INIT_SPLIT,
    },
  });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
