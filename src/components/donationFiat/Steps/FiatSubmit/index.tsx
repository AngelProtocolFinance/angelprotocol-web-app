import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FiatDonateValues } from "./types";
import { SubmitStep } from "slices/donation";
import Form from "./Form";
import { schema } from "./schema";

export default function FiatSubmit(props: SubmitStep) {
  let defaultValues: FiatDonateValues = {
    name: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    country: {
      name: "",
      flag: "",
    },
    paymentOption: "CARD",
  };
  const methods = useForm<FiatDonateValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form {...props} />
    </FormProvider>
  );
}
