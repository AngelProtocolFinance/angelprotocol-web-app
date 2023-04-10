import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues, Config as TConfig } from "./types";
import { IndexFundConfig } from "types/contracts";
import { useContractQuery } from "services/juno";
import QueryLoader from "components/QueryLoader";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function Config() {
  const query = useContractQuery("index-fund.config", {});

  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: <FormSkeleton />,
        error: <FormError errorMessage="failed to get index fund config" />,
      }}
    >
      {(config) => <FundConfigContext {...config} />}
    </QueryLoader>
  );
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
