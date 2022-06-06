import { yupResolver } from "@hookform/resolvers/yup";
import { DonateValues } from "components/Transactors/Donater/types";
import { MAIN_DENOM } from "constants/currency";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from "./schema";
import { Props } from "./types";

export default function Donater(props: Props) {
  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      split_liq: `${props.min_liq || 0}`,
      //metadata
      currency: MAIN_DENOM,
      min_liq: props.min_liq || 0,
      max_liq: props.max_liq || (props.max_liq === 0 ? 0 : 100),
      to: props.to,
      receiver: props.receiver,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <props.Form />
    </FormProvider>
  );
}
