import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  memberUpdatorSchema,
  MemberUpdatorValues,
} from "./memberUpdatorSchema";

export type MemberUpdatorProps = { Form: FC };
export default function MemberUpdator(props: { Form: FC }) {
  const methods = useForm<MemberUpdatorValues>({
    reValidateMode: "onSubmit",
    defaultValues: {
      addr: "",
      weight: "1",
    },
    resolver: yupResolver(memberUpdatorSchema),
  });

  return (
    <FormProvider {...methods}>
      <props.Form />
    </FormProvider>
  );
}
