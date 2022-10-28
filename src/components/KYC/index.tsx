import { Dialog } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues, Props } from "./types";
import Form, { formStyle } from "./Form";
import { schema } from "./schema";

export default function KYCv2(props: Props) {
  const isOnDonation = props.type === "on-donation";

  let defaultValues: Partial<FormValues> = {};
  if (isOnDonation && props.state.kyc) {
    const { kyc } = props.state;
    if (kyc === "skipped") {
      defaultValues = { hasAgreedToTerms: true };
    } else {
      defaultValues = { ...kyc };
    }
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
        className={`${formStyle} fixed-center z-20 rounded-md w-full max-w-xl max-h-[75vh] overflow-y-auto scroller shadow-lg border-none dark:border-2 dark:border-bluegray-d1 p-4`}
      >
        <Form {...props} />
      </Dialog.Panel>
    </FormProvider>
  );
}
