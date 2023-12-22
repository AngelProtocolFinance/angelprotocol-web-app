import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues, Props } from "./types";
import { placeHolderCountryOption } from "components/CountrySelector";
import Modal from "components/Modal";
import Form, { formStyle } from "./Form";
import { schema } from "./schema";

export default function KYC(props: Props) {
  const isOnDonation = props.type === "on-donation";

  const methods = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues:
      isOnDonation && props.state.kyc
        ? props.state.kyc
        : {
            country: placeHolderCountryOption,
            usState: { label: "", value: "" },
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
