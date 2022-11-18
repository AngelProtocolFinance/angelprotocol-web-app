import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import Form from "./Form";

export default function Signup({ classes = "" }: { classes?: string }) {
  const methods = useForm<FormValues>({
    resolver: yupResolver(
      Yup.object().shape<SchemaShape<FormValues>>({
        email: Yup.string().required("required").email("invalid email"),
        hasAgreedToPrivacyPolicy: Yup.boolean().oneOf(
          [true],
          "must agree to privacy policy"
        ),
      })
    ),
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
