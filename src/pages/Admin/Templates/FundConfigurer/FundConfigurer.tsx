import { yupResolver } from "@hookform/resolvers/yup";
import { Dec } from "@terra-money/terra.js";
import { FundConfig, IndexFundConfig } from "@types-server/contracts";
import { FormProvider, useForm } from "react-hook-form";
import FormError from "pages/Admin/components/FormError";
import FormSkeleton from "pages/Admin/components/FormSkeleton";
import { useIndexFundConfig } from "services/terra/indexFund/queriers";
import FundConfigForm from "./FundConfigForm";
import { FundConfigValues, fundConfigSchema } from "./fundconfigSchema";

export default function FundConfigurer() {
  const { indexFundConfig, isLoading, isError } = useIndexFundConfig();

  if (isLoading) return <FormSkeleton />;
  if (isError || !indexFundConfig)
    return <FormError errorMessage="failed to get index fund config" />;
  return <FundConfigContext {...indexFundConfig} />;
}

function FundConfigContext(props: IndexFundConfig) {
  const initialConfigPayload: FundConfig = {
    fund_member_limit: props.fund_member_limit,
    fund_rotation: props.fund_rotation,
    funding_goal:
      props.funding_goal &&
      new Dec(props.funding_goal).div(1e6).toInt().toString(),
  };
  const methods = useForm<FundConfigValues>({
    resolver: yupResolver(fundConfigSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { ...initialConfigPayload, initialConfigPayload },
  });

  return (
    <FormProvider {...methods}>
      <FundConfigForm />
    </FormProvider>
  );
}
