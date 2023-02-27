import { FormProvider, useForm } from "react-hook-form";
import Form from "./Form";

export default function Management() {
  const methods = useForm({
    defaultValues: {
      members: [
        { addr: "juno1akkesf6xfuny3upfaq6yfvefzfr8jt2jfhvlw2", weight: 1 },
      ],
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
