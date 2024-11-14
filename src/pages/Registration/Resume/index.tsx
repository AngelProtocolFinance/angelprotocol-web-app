import { valibotResolver } from "@hookform/resolvers/valibot";
import { getSavedRegistrationReference } from "helpers";
import { useRendered } from "hooks/use-rendered";
import { FormProvider, useForm } from "react-hook-form";
import Form from "./Form";
import { type FormValues, schema } from "./types";

export function Component({ classes = "" }: { classes?: string }) {
  const methods = useForm<FormValues>({
    defaultValues: {
      reference: getSavedRegistrationReference() || "",
    },
    resolver: valibotResolver(schema),
  });
  useRendered();

  return (
    <FormProvider {...methods}>
      <Form classes={classes} />
    </FormProvider>
  );
}
