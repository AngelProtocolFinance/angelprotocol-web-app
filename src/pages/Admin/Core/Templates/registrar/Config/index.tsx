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
  const initialConfigPayload: RegistrarConfigExtensionPayload = {
    accounts_contract: props.accounts_contract || "",
    accounts_settings_controller: props.accounts_settings_controller || "",
    applications_review: props.applications_review || "",
    charity_shares_contract: props.charity_shares_contract || "",
    collector_addr: props.collector_addr || "",
    donation_match_charites_contract:
      props.donation_match_charites_contract || "",
    fundraising_contract: "",
    gov_contract: props.gov_contract || "",
    halo_token_lp_contract: props.halo_token_lp_contract || "",
    halo_token: props.halo_token || "",
    index_fund_contract: props.index_fund || "",
    swap_factory: props.swap_factory || "",
    swaps_router: props.swaps_router || "",

    //wasm codes
    /** NaN is blank ("") for <input type="number />"
     *  can't directly use "" since string is not assignable to number
     */
    cw3_code: props.cw3_code || NaN,
    cw4_code: props.cw4_code || NaN,
    subdao_bonding_token_code: props.subdao_bonding_token_code || NaN,
    subdao_cw20_token_code: props.subdao_cw20_token_code || NaN,
    subdao_cw900_code: props.subdao_cw900_code || NaN,
    subdao_distributor_code: props.subdao_distributor_code || NaN,
    subdao_gov_code: props.subdao_gov_code || NaN,
  };

  const methods = useForm<RegistrarConfigExtensionValues>({
    resolver: yupResolver(schema),
    defaultValues: { ...initialConfigPayload, initialConfigPayload },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
