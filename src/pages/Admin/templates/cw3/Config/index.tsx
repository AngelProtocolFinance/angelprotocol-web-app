import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { useAdminResources } from "../../../Context";
import Form from "./Form";
import { schema } from "./schema";

export default function Config() {
  const { config, members } = useAdminResources();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    context: { members: members.length },
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      threshold: `${config.threshold}`,
      requireExecution: config.requireExecution,
      initial: config,
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
