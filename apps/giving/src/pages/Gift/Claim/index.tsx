import { requiredString } from "@giving/schemas/string";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormValues as FV } from "./types";
import { SchemaShape } from "@giving/schemas/types";
import Form from "./Form";

export default function Claim({ classes = "" }) {
  const methods = useForm<FV>({
    defaultValues: {
      secret: "",
    },
    resolver: yupResolver(
      Yup.object().shape<SchemaShape<FV>>({
        secret: requiredString,
      })
    ),
  });

  return (
    <FormProvider {...methods}>
      <Form classes={classes} />
    </FormProvider>
  );
}
