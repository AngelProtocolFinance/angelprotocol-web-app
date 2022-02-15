import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { EditableProfileAttr } from "services/aws/endowments/types";

export default function CharityEditor(
  props: EditableProfileAttr & { children: ReactNode }
) {
  const { children, ...restProps } = props;
  const methods = useForm<EditableProfileAttr>({
    reValidateMode: "onChange",
    defaultValues: {
      ...restProps,
    },
    resolver: yupResolver(schema),
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}
