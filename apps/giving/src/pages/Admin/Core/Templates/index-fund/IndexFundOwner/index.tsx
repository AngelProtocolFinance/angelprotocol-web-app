import { FormError, FormSkeleton } from "@giving/components/admin";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { IndexFundConfig } from "@giving/types/contracts";
import { IndexFundOwnerValues } from "@giving/types/pages/admin";
import { useIndexFundConfigQuery } from "services/juno/indexFund";
import Form from "./Form";
import { schema } from "./schema";

export default function IndexFundOwner() {
  const {
    data: indexFundConfig,
    isLoading,
    isError,
  } = useIndexFundConfigQuery(null);
  if (isLoading) return <FormSkeleton />;
  if (isError || !indexFundConfig)
    return <FormError errorMessage="failed to load registrar config" />;
  return <FormWithContext {...indexFundConfig} />;
}

function FormWithContext(props: IndexFundConfig) {
  const methods = useForm<IndexFundOwnerValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { initialOwner: props.owner },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
