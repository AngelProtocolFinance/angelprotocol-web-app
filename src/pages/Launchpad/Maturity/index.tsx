import { FormProvider, useForm } from "react-hook-form";
import Form from "./Form";

export default function Maturity() {
  const methods = useForm({
    defaultValues: {
      beneficiaries: [
        { addr: "juno1akkesf6xfuny3upfaq6yfvefzfr8jt2jfhvlw2", share: 13 },
        { addr: "juno1akkesf6xfuny3upfaq6yfvefzfr8jt2jfhvlw2", share: 20 },
        { addr: "juno1akkesf6xfuny3upfaq6yfvefzfr8jt2jfhvlw2", share: 21 },
      ],
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
