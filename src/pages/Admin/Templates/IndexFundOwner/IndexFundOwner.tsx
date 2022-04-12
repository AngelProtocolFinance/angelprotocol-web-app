import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "pages/Admin/components/FormError";
import FormSkeleton from "pages/Admin/components/FormSkeleton";
import { FormProvider, useForm } from "react-hook-form";
import { useIndexFundConfig } from "services/terra/indexFund/queriers";
import { IndexFundConfig } from "services/terra/indexFund/types";
import OwnerUpdateForm from "./OwnerUpdateForm";
import { IndexFundOwnerValues, updateOwnerSchema } from "./updateOwnerSchema";

export default function IndexFundOwner() {
  const { indexFundConfig, isLoading, isError } = useIndexFundConfig();
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
