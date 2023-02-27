import { FormProvider, useForm } from "react-hook-form";
import Form from "./Form";

export default function Management() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
