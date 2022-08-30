import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { IndexFundOwnerValues } from "pages/Admin/types";
import { IndexFundConfig } from "types/contracts";
import { useIndexFundConfigQuery } from "services/juno/indexFund";
import { FormError, FormSkeleton } from "components/admin";
import OwnerUpdateForm from "./OwnerUpdateForm";
import { updateOwnerSchema } from "./updateOwnerSchema";

export default function IndexFundOwner() {
  const {
    data: indexFundConfig,
    isLoading,
    isError,
  } = useIndexFundConfigQuery(null);
  if (isLoading) return <FormSkeleton />;
  if (isError || !indexFundConfig)
    return <FormError errorMessage="failed to load registrar config" />;
  return <IndexFundOwnerContext {...indexFundConfig} />;
}

function IndexFundOwnerContext(props: IndexFundConfig) {
  const methods = useForm<IndexFundOwnerValues>({
    resolver: yupResolver(updateOwnerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { initialOwner: props.owner },
  });

  return (
    <FormProvider {...methods}>
      <OwnerUpdateForm />
    </FormProvider>
  );
}
