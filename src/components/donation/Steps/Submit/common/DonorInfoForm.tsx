import { Field } from "components/form";
import { FormProvider, useForm } from "react-hook-form";

export default function DonorInfoForm() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form className="">
        <Field name="firstName" label="Your name" />
        <Field name="lastName" label="" />
        <Field name="email" label="Your emai" />
      </form>
    </FormProvider>
  );
}
