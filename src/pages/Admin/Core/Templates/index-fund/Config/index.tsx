import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues, Config as TConfig } from "./types";
import { IndexFundConfig } from "types/contracts";
import { useContractQuery } from "services/juno";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function Config() {
  const {
    data: indexFundConfig,
    isLoading,
    isError,
  } = useContractQuery("index-fund.config", {});
  if (isLoading) return <FormSkeleton />;
  if (isError || !indexFundConfig)
    return <FormError errorMessage="failed to get index fund config" />;
  return <FundConfigContext {...indexFundConfig} />;
}

function FundConfigContext(props: IndexFundConfig) {
  const initial: TConfig = {
    fundRotation: props.fundRotation,
    fundMemberLimit: props.fundMemberLimit,
    fundingGoal: props.fundingGoal,
  };
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { ...initial, initial },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
