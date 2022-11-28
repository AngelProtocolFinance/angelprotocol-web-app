import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { CW3ConfigValues, FormCW3Config } from "pages/Admin/types";
import { CW3Config } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useCw3ConfigQuery } from "services/juno/cw3";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function Config() {
  const { cw3 } = useAdminResources();
  const { data: cw3Config, isLoading, isError } = useCw3ConfigQuery(cw3);
  if (isLoading) return <FormSkeleton />;
  if (isError || !cw3Config)
    return <FormError errorMessage="failed to get contract config" />;

  return <CW3ConfigContext {...cw3Config} />;
}

function CW3ConfigContext(cw3Config: CW3Config) {
  const isTime = "time" in cw3Config.max_voting_period;
  const duration =
    "time" in cw3Config.max_voting_period
      ? cw3Config.max_voting_period.time
      : cw3Config.max_voting_period.height;

  const initial: FormCW3Config = {
    threshold: +cw3Config.threshold.absolute_percentage.percentage * 100,
    duration,
    require_execution: cw3Config.require_execution,
    seed_split_to_liquid: cw3Config.seed_split_to_liquid,
    seed_asset: cw3Config.seed_asset,
    new_endow_gas_money: cw3Config.new_endow_gas_money,
  };

  const methods = useForm<CW3ConfigValues>({
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
