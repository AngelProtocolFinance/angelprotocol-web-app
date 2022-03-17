import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MemberEditValues as MV, schema } from "./schema";

export default function MemberEditor(props: { Form: FC; initialValues: MV }) {
  const methods = useForm<MV>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: props.initialValues,
  });

  return (
    <FormProvider {...methods}>
      <props.Form />
    </FormProvider>
  );
}
