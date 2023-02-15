import { Dialog } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues, Props } from "./types";
import { placeHolderCountryOption } from "components/CountrySelector";
import Form, { formStyle } from "./Form";
import { schema } from "./schema";

export default function KYC(props: Props) {
  const isOnDonation = props.type === "on-donation";

  let defaultValues: Partial<FormValues> = {};
  if (isOnDonation && props.state.kyc) {
    const { kyc } = props.state;
    if (kyc === "skipped") {
      defaultValues = {
        hasAgreedToTerms: true,
        country: placeHolderCountryOption,
        usState: { label: "", value: "" },
      };
    } else {
      defaultValues = { ...kyc };
    }
  } else {
    defaultValues = {
      country: placeHolderCountryOption,
      usState: { label: "", value: "" },
    };
  }

  const methods = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues,
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
      <Dialog.Panel
        className={`${formStyle} fixed-center z-20 rounded-md p-6 w-full max-w-xl max-h-[85vh] overflow-y-auto scroller shadow-lg border-none dark:border-2 dark:border-bluegray`}
      >
        <Form {...props} />
      </Dialog.Panel>
    </FormProvider>
  );
}
