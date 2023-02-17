import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { CW3ConfigValues, FormCW3Config } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import Form from "./Form";
import { schema } from "./schema";

export default function Config() {
  const { config } = useAdminResources();
  const isTime = "time" in config.max_voting_period;
  const duration =
    "time" in config.max_voting_period
      ? config.max_voting_period.time
      : config.max_voting_period.height;

  const initial: FormCW3Config = {
    threshold: +config.threshold.absolute_percentage.percentage * 100,
    duration,
    require_execution: config.require_execution,
  };

  const methods = useForm<CW3ConfigValues<FormCW3Config>>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      ...initial,
      initial,
      isTime,
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
