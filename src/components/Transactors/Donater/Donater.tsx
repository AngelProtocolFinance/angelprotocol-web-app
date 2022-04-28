import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { DonateValues, Props } from "@types-component/donater";
import { SchemaShape } from "@types-schema";
import { requiredTokenAmount } from "schemas/number";

const shape: SchemaShape<DonateValues> = {
  amount: requiredTokenAmount,
};
const schema = Yup.object().shape(shape);

export default function Donater(props: Props) {
  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      split_liq: `${props.min_liq || 0}`,
      //metadata
      currency: "uusd",
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
