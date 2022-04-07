import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "pages/Admin/components/FormError";
import FormSkeleton from "pages/Admin/components/FormSkeleton";
import { FormProvider, useForm } from "react-hook-form";
import { useRegistrarConfig } from "services/terra/registrar/queriers";
import { RegistrarConfig } from "services/terra/registrar/types";
import RegistrarConfigForm from "./RegistrarConfigForm";
import {
  registrarConfigSchema,
  RegistrarConfigValues,
} from "./registrarConfigSchema";

export default function RegistrarConfigurer() {
  const { registrarConfig, isLoading, isError } = useRegistrarConfig();
  if (isLoading) return <FormSkeleton />;
  if (isError || !registrarConfig)
    return <FormError errorMessage="failed to load registrar config" />;
  return <RegistrarConfigContext {...registrarConfig} />;
}

function RegistrarConfigContext(props: RegistrarConfig) {
  const methods = useForm<RegistrarConfigValues>({
    resolver: yupResolver(registrarConfigSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      accounts_code_id: props.accounts_code_id,
      index_fund_contract: props.index_fund, //addr
      treasury: props.treasury, //addr
      tax_rate: props.tax_rate,
      default_vault: props.default_vault,
      guardians_multisig_addr: props.guardians_multisig_addr,
      endowment_owners_group_addr: props.endowment_owners_group_addr,
      split_max: props.split_to_liquid.max,
      split_min: props.split_to_liquid.min,
      split_default: props.split_to_liquid.default,
      halo_token: props.halo_token,
      gov_contract: props.gov_contract,
      charity_shares_contract: props.charity_shares_contract,
    },
  });

  return (
    <FormProvider {...methods}>
      <RegistrarConfigForm />
    </FormProvider>
  );
}
