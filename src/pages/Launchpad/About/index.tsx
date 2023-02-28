import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { object } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { useLaunchpad } from "slices/launchpad";
import { requiredString } from "schemas/string";
import { withStepGuard } from "../withStepGuard";
import Form from "./Form";

export default withStepGuard<1>(function About({ data }) {
  const { update } = useLaunchpad(1);
  const methods = useForm<FV>({
    resolver: yupResolver(
      object().shape<SchemaShape<FV>>({
        name: requiredString,
        tagline: requiredString,
      })
    ),
    defaultValues: data || {
      name: "",
      tagline: "",
    },
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit((data) => update(data))} />
    </FormProvider>
  );
});
