import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FundConfigValues } from "pages/Admin/types";
import { FundConfig, IndexFundConfig } from "types/server/contracts";
import FormError from "pages/Admin/common/FormError";
import FormSkeleton from "pages/Admin/common/FormSkeleton";
import { useIndexFundConfig } from "services/juno/indexFund/queriers";
import { condenseToStr } from "helpers";
import FundConfigForm from "./FundConfigForm";
import { fundConfigSchema } from "./fundconfigSchema";

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
    funding_goal: props.funding_goal && condenseToStr(props.funding_goal),
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
