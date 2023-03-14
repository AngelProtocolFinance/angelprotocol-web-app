import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { RegistrarConfigExtensionValues } from "pages/Admin/types";
import {
  RegistrarConfigExtension,
  RegistrarConfigExtensionPayload,
} from "types/contracts";
import { useRegistrarConfigExtensionQuery } from "services/juno/registrar";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function Config() {
  const {
    data: config,
    isLoading,
    isError,
  } = useRegistrarConfigExtensionQuery(null);
  if (isLoading) return <FormSkeleton />;
  if (isError || !config)
    return <FormError errorMessage="failed to load registrar config" />;
  return <RegistrarConfigContext {...config} />;
}

function RegistrarConfigContext(props: RegistrarConfigExtension) {
  const initialConfigPayload: Partial<RegistrarConfigExtensionPayload> = {
    accounts_contract: props.accounts_contract,
    index_fund_contract: props.index_fund, //addr
    halo_token: props.halo_token,
    gov_contract: props.gov_contract,
    charity_shares_contract: props.charity_shares_contract,
    applications_review: props.applications_review,
    swaps_router: props.swaps_router,
    cw3_code: props.cw3_code,
    cw4_code: props.cw4_code,
  };

  const methods = useForm<RegistrarConfigExtensionValues>({
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
