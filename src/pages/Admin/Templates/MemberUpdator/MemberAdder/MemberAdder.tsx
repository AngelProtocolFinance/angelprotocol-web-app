import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addMemberSchema } from "./addMemberSchema";

export type Values = {
  weight: string;
  addr: string;
};

export default function MemberAdder(props: { children: ReactNode }) {
  const methods = useForm<Values>({
    reValidateMode: "onChange",
    defaultValues: {
      addr: "",
      weight: "1",
    },
    resolver: yupResolver(addMemberSchema),
  });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
