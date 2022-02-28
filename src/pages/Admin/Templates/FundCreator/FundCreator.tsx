import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function FundCreator(props: { children: ReactNode }) {
  const methods = useForm({
    defaultValues: {
      addr: "",
      weight: "1",
      title: "Create fund",
    },
  });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
