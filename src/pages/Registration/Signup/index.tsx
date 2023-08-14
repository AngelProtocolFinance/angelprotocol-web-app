import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { boolean, object, string } from "yup";
import { FormValues } from "./types";
import Form from "./Form";

export default function Signup({ classes = "" }: { classes?: string }) {
  const methods = useForm<FormValues>({
    resolver: yupResolver(
      object({
        email: string().required("required").email("invalid email"),
        hasAgreedToPrivacyPolicy: boolean()
          .required()
          .oneOf([true], "must agree to privacy policy"),
      })
    ),
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
