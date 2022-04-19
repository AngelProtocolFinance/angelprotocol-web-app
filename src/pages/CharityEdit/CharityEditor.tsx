import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { EditableProfileAttr } from "types/services/aws/endowments";
import { schema } from "./schema";

export default function CharityEditor(
  props: EditableProfileAttr & { children: ReactNode }
) {
  const { children, ...restProps } = props;
  const methods = useForm<EditableProfileAttr>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      ...restProps,
    },
    resolver: yupResolver(schema),
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}
