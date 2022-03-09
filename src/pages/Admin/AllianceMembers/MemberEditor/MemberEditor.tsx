import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MemberEditValues as MV, schema } from "./schema";

export type Props = { Form: FC };
export default function MemberEditor(props: Props) {
  const methods = useForm<MV>({
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
