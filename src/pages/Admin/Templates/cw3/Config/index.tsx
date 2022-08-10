import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { CW3ConfigValues, FormCW3Config } from "pages/Admin/types";
import { CW3Config } from "types/server/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import FormError from "pages/Admin/common/FormError";
import FormSkeleton from "pages/Admin/common/FormSkeleton";
import { useCw3ConfigQuery } from "services/juno/cw3";
import CW3 from "contracts/CW3";
import CW3ConfigForm from "./Form";
import { schema } from "./schema";

export default function Config() {
  const { cw3 } = useAdminResources();
  const contract = new CW3(undefined, cw3);
  const {
    data: cw3Config,
    isLoading,
    isError,
  } = useCw3ConfigQuery(contract.config);
  if (isLoading) return <FormSkeleton />;
  if (isError || !cw3Config)
    return <FormError errorMessage="failed to get contract config" />;

  console.log(cw3Config);

  return <CW3ConfigContext {...cw3Config} />;
}

function CW3ConfigContext({ max_voting_period, threshold }: CW3Config) {
  const isTime = "time" in max_voting_period;
  const duration =
    "time" in max_voting_period
      ? max_voting_period.time
      : max_voting_period.height;

  const initial: FormCW3Config = {
    threshold: +threshold.absolute_percentage.percentage * 100,
    duration,
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
      <CW3ConfigForm />
    </FormProvider>
  );
}
