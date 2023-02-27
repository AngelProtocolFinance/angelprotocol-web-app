import { FormProvider, useForm } from "react-hook-form";
import Form from "./Form";

export default function Splits() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
