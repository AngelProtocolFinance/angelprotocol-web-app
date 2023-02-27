import { FormProvider, useForm } from "react-hook-form";
import Form from "./Form";

export default function Whitelists() {
  const methods = useForm({
    defaultValues: {
      contributors: [],
      beneficiaries: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
