import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { IndexFundOwnerValues } from "pages/Admin/types";
import { IndexFundConfig } from "types/server/contracts";
import FormError from "pages/Admin/common/FormError";
import FormSkeleton from "pages/Admin/common/FormSkeleton";
import { useIndexFundConfigQuery } from "services/juno/indexFund";
import { queryObject } from "services/juno/queryContract/queryObjects";
import { contracts } from "constants/contracts";
import OwnerUpdateForm from "./OwnerUpdateForm";
import { updateOwnerSchema } from "./updateOwnerSchema";

export default function IndexFundOwner() {
  const {
    data: indexFundConfig,
    isLoading,
    isError,
  } = useIndexFundConfigQuery({
    address: contracts.index_fund,
    msg: queryObject.ifConfig,
  });
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
