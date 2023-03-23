import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FundConfigValues } from "pages/Admin/types";
import { FundConfig, IndexFundConfig } from "types/contracts";
import useQueryContract from "services/contract/useQueryContract";
import { FormError, FormSkeleton } from "components/admin";
import { condenseToStr } from "helpers";
import Form from "./Form";
import { schema } from "./schema";

export default function Config() {
  const {
    data: indexFundConfig,
    isLoading,
    error,
  } = useQueryContract("index-fund", "ifConfig", null);

  if (isLoading) return <FormSkeleton />;
  if (!!error || !indexFundConfig)
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
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { ...initialConfigPayload, initialConfigPayload },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
