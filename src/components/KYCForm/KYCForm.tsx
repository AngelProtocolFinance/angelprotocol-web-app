import { yupResolver } from "@hookform/resolvers/yup";
import { placeHolderCountryOption } from "components/CountrySelector";
import Modal from "components/Modal";
import { FormProvider, useForm } from "react-hook-form";
import Form, { formStyle } from "./Form";
import { schema } from "./schema";
import type { FormValues, Props } from "./types";

export default function KYCForm(props: Props) {
  const init: FormValues = {
    name: { first: "", last: "" },
    address: { street: "", complement: "" },
    city: "",
    postalCode: "",
    country: placeHolderCountryOption,
    usState: { label: "", value: "" },
    state: "",
    kycEmail: "",
  };

  const methods = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: props.defaultValues || init,
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Modal
        className={`${formStyle} bg-white fixed-center z-20 rounded-md p-6 w-full max-w-xl max-h-[85vh] overflow-y-auto scroller shadow-lg border-none dark:border-2 dark:border-navy`}
      >
        <Form {...props} />
      </Modal>
    </FormProvider>
  );
}
