import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import {
  useRegState,
  withStepGuard,
} from "services/aws/registration/StepGuard";
import Form from "./Form";
import { schema } from "./schema";

function ContactDetails() {
  const {
    data: { contact, init },
  } = useRegState<1>();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: contact
      ? { ...contact, ref: init.reference }
      : {
          ref: init.reference,
          email: init.email,
        },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

export default withStepGuard(ContactDetails);
