import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { CW3ConfigValues, FormReviewCW3Config } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import Form from "./Form";
import { schema } from "./schema";

export default function ReviewCW3Configurer() {
  const { config } = useAdminResources<"review">();

  const isTime = "time" in config.max_voting_period;
  const duration =
    "time" in config.max_voting_period
      ? config.max_voting_period.time
      : config.max_voting_period.height;

  const initial: FormReviewCW3Config = {
    threshold: +config.threshold.absolute_percentage.percentage * 100,
    duration,
    require_execution: config.require_execution,
    seed_split_to_liquid: config.seed_split_to_liquid,
    new_endow_gas_money: config.new_endow_gas_money,
    seed_asset: config.seed_asset,
  };

  const methods = useForm<CW3ConfigValues<FormReviewCW3Config>>({
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
