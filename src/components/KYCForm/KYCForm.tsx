import { yupResolver } from "@hookform/resolvers/yup";
import { placeHolderCountryOption } from "components/CountrySelector";
import Modal from "components/Modal";
import { FormProvider, useForm } from "react-hook-form";
import Form, { formStyle } from "./Form";
import { schema } from "./schema";
import { FormValues, Props } from "./types";

export default function KYCForm(props: Props) {
  const isOnDonation = props.type === "on-donation";

  const donationEmail =
    props.type === "on-donation" ? props.donationEmail ?? "" : "";
  //user is not allowed to change the email provided (explicitly or from auth email) in donation step
  const isEmailFixed = !!donationEmail;

  const init: FormValues = {
    name: { first: "", last: "" },
    address: { street: "", complement: "" },
    city: "",
    postalCode: "",
    country: placeHolderCountryOption,
    usState: { label: "", value: "" },
    state: "",
    kycEmail: donationEmail,
  };

  const methods = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: props.defaultValues || init,
    resolver: yupResolver(schema),
  });

  if (isOnDonation) {
    return (
      <FormProvider {...methods}>
        <Form {...props} isEmailFixed={isEmailFixed} />
      </FormProvider>
    );
  }

  return (
    <FormProvider {...methods}>
      <Modal
        className={`${formStyle} bg-white fixed-center z-20 rounded-md p-6 w-full max-w-xl max-h-[85vh] overflow-y-auto scroller shadow-lg border-none dark:border-2 dark:border-bluegray`}
      >
        <Form {...props} isEmailFixed={isEmailFixed} />
      </Modal>
    </FormProvider>
  );
}
