import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { IndexFundOwnerValues } from "pages/Admin/types";
import { IndexFundConfig } from "types/contracts";
import useQueryContract from "services/contract/useQueryContract";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function IndexFundOwner() {
  const {
    data: indexFundConfig,
    isLoading,
    error,
  } = useQueryContract("index-fund", "ifConfig", null);
  if (isLoading) return <FormSkeleton />;
  if (!!error || !indexFundConfig)
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
