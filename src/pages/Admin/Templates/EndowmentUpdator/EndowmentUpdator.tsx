import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function EndowmentUpdator(props: { children: ReactNode }) {
  const methods = useForm({
    defaultValues: {
      addr: "",
      weight: "1",
    },
  });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
