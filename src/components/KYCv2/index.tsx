import { Dialog } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues, Props } from "./types";
import Form from "./Form";
import { schema } from "./schema";

export default function KYCv2(props: Props) {
  const isOnDonation = props.type === "on-donation";
  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: isOnDonation
      ? props.state.kyc === "skipped"
        ? {}
        : props.state.kyc
      : {},
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
        className={`fixed-center z-20 rounded-md w-full max-w-xl max-h-[75vh] overflow-y-auto scroller shadow-lg border-none dark:border-2 dark:border-bluegray-d1 p-4`}
      >
        <Form {...props} />
      </Dialog.Panel>
    </FormProvider>
  );
}
