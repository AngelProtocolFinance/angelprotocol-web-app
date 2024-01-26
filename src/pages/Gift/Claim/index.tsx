import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { requiredString } from "schemas/string";
import { object } from "yup";
import Form from "./Form";
import { FormValues as FV } from "./types";

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
