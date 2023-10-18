import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { boolean, object } from "yup";
import { FormValues } from "./types";
import Form from "./Form";

export default function Signup({ classes = "" }: { classes?: string }) {
  const methods = useForm<FormValues>({
    resolver: yupResolver(
      object({
        hasAgreedToPrivacyPolicy: boolean()
          .required()
          .oneOf([true], "must agree to privacy policy"),
      })
    ),
    defaultValues: {
      hasAgreedToPrivacyPolicy: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <Form classes={classes} />
    </FormProvider>
  );
}
