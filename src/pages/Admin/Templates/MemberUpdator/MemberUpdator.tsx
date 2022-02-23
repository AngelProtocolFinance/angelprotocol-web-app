import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  memberUpdatorSchema,
  MemberUpdatorValues,
} from "./memberUpdatorSchema";

export default function MemberUpdator(props: { children: ReactNode }) {
  const methods = useForm<MemberUpdatorValues>({
    defaultValues: {
      addr: "",
      weight: "1",
      title: "Update members",
    },
    resolver: yupResolver(memberUpdatorSchema),
  });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
