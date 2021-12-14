import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Props } from "./types";
import { schema } from "./schema";
import { denoms } from "constants/currency";
import { Values } from "components/Donater/types";

export default function Donater(props: Props) {
  const methods = useForm<Values>({
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      split_liq: `${props.min_liq || 0}`,
      //metadata
      currency: denoms.uusd,
      min_liq: props.min_liq || 0,
      max_liq: props.max_liq || (props.max_liq === 0 ? 0 : 100),
      to: props.to,
      receiver: props.receiver,
    },
    resolver: yupResolver(schema),
  });
  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
