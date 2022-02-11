import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { EditableProfileAttr } from "./types";

export default function CharityEditor(
  props: EditableProfileAttr & { children: ReactNode }
) {
  const methods = useForm<EditableProfileAttr>({
    reValidateMode: "onChange",
    defaultValues: {
      ...props,
    },
  });
  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
