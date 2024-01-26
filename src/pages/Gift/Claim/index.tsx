import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { object } from "yup";
import { FormValues as FV } from "./types";
import { requiredString } from "schemas/string";
import Form from "./Form";

export default function Claim({ classes = "" }) {
  const methods = useForm<FV>({
    defaultValues: {
      secret: "",
    },
    resolver: yupResolver(
      object({
        secret: requiredString,
      }),
    ),
  });

  return (
    <FormProvider {...methods}>
      <Form classes={classes} />
    </FormProvider>
  );
}
