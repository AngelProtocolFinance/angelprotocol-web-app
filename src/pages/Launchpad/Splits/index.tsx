import { FormProvider, useForm } from "react-hook-form";
import Form from "./Form";

export default function Splits() {
  const methods = useForm({
    defaultValues: {
      min: 40,
      max: 60,
      defaultMin: 0,
      defaultMax: 50,
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
