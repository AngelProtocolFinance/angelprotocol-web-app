import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { ObjectSchema, boolean, object, string } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import Form from "./Form";

const schema = object<any, SchemaShape<FormValues>>({
  email: string().required("required").email("invalid email"),
  hasAgreedToPrivacyPolicy: boolean().oneOf(
    [true],
    "must agree to privacy policy"
  ),
}) as ObjectSchema<FormValues>;

export default function Signup({ classes = "" }: { classes?: string }) {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      hasAgreedToPrivacyPolicy: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <Form classes={classes} />
    </FormProvider>
  );
}
