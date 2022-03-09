import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MemberAdderValues, schema } from "./schema";

export type Props = { Form: FC };
export default function MemberAdder(props: Props) {
  const methods = useForm<MemberAdderValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <props.Form />
    </FormProvider>
  );
}
