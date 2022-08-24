import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { DonateValues, DonaterProps } from "./types";
import { SchemaShape } from "schemas/types";
import { useChain } from "contexts/ChainGuard";
import { requiredTokenAmount } from "schemas/number";
import DonateForm from "./Form";

const shape: SchemaShape<DonateValues> = {
  amount: requiredTokenAmount,
  isAgreedToTerms: Yup.boolean().isTrue(),
};
const schema = Yup.object().shape(shape);

export default function Donater(
  props: DonaterProps /** set by opener context */
) {
  const chain = useChain();
  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      split_liq: `${props.min_liq || 0}`,
      //metadata
      token: chain.native_currency,
      min_liq: props.min_liq || 0,
      max_liq: props.max_liq || (props.max_liq === 0 ? 0 : 100),
      to: props.to,
      receiver: props.receiver,
      isKycDonorOnly: props.isKycDonorOnly,
    },
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <DonateForm />
    </FormProvider>
  );
}
