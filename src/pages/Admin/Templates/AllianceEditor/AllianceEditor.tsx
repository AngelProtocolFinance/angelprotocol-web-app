import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { allianceEditSchema, AllianceEditValues } from "./alllianceEditSchema";

export default function AllianceEditor(props: { children: ReactNode }) {
  const methods = useForm<AllianceEditValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(allianceEditSchema),
    defaultValues: {
      walletAddr: "",
    },
  });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
