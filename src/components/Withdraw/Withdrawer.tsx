import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Props, Values } from "./types";
import { schema } from "./schema";

export default function Withdrawer(props: Props) {
  const methods = useForm<Values>({
    reValidateMode: "onChange",
    defaultValues: {
      withdraw: "",
      withdrawAmount: 0,
      receiver: props.receiver,
    },
    resolver: yupResolver(schema),
  });
  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
