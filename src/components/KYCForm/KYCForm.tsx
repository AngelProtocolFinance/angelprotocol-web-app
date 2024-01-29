import { yupResolver } from "@hookform/resolvers/yup";
import { placeHolderCountryOption } from "components/CountrySelector";
import Modal from "components/Modal";
import { FormProvider, useForm } from "react-hook-form";
import Form, { formStyle } from "./Form";
import { schema } from "./schema";
import { FormValues, Props } from "./types";

export default function KYCForm(props: Props) {
  const isOnDonation = props.type === "on-donation";

  const methods = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      ...(props.defaultValues ?? {}),
      country: props.defaultValues?.country ?? placeHolderCountryOption,
      usState: props.defaultValues?.usState ?? { label: "", value: "" },
    },
    resolver: yupResolver(schema),
  });

  if (isOnDonation) {
    return (
      <FormProvider {...methods}>
        <Form {...props} />
      </FormProvider>
    );
  }

  return (
    <FormProvider {...methods}>
      <Modal
        className={`${formStyle} bg-white fixed-center z-20 rounded-md p-6 w-full max-w-xl max-h-[85vh] overflow-y-auto scroller shadow-lg border-none dark:border-2 dark:border-bluegray`}
      >
        <Form {...props} />
      </Modal>
    </FormProvider>
  );
}
