import { valibotResolver } from "@hookform/resolvers/valibot";
import { getSavedRegistrationReference } from "helpers";
import { FormProvider, useForm } from "react-hook-form";
import Form from "./Form";
import { type FormValues, schema } from "./types";

export default function Resume({ classes = "" }: { classes?: string }) {
  const methods = useForm<FormValues>({
    defaultValues: {
      reference: getSavedRegistrationReference() || "",
    },
    resolver: valibotResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Form classes={classes} />
    </FormProvider>
  );
}
