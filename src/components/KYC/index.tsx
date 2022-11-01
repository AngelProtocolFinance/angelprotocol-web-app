import { Dialog } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues, Props } from "./types";
import Form from "./Form";
import { schema } from "./schema";

export default function KYC(props: Props) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      consent_marketing: false,
      consent_tax: false,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      {/** atm, receipt form is used in modal, add option to wrap in div if not used as modal */}
      <Dialog.Panel
        className={`fixed-center z-20 rounded-md w-full max-w-xl max-h-[75vh] overflow-y-auto scroller shadow-lg border-none dark:border-2 dark:border-bluegray`}
      >
        <Form {...props} />
      </Dialog.Panel>
    </FormProvider>
  );
}
