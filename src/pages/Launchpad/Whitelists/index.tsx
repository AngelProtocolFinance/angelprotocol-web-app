import { FormProvider, useForm } from "react-hook-form";
import Form from "./Form";

export default function Whitelists() {
  const methods = useForm({
    defaultValues: {
      contributors: ["abcd", "efgh", "ijkl"],
      beneficiaries: ["abcd", "efgh", "ijkl"],
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
