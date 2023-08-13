import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { ObjectSchema, object, string } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { getSavedRegistrationReference } from "helpers";
import Form from "./Form";

const schema = object<any, SchemaShape<FormValues>>({
  reference: string().required("required"),
}) as ObjectSchema<FormValues>;

export default function Resume({ classes = "" }: { classes?: string }) {
  const methods = useForm<FormValues>({
    defaultValues: {
      reference: getSavedRegistrationReference() || "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Form classes={classes} />
    </FormProvider>
  );
}
