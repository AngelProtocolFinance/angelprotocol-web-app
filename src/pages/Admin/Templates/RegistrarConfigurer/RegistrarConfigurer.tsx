import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  RegistrarConfig,
  RegistrarConfigPayload,
} from "types/server/contracts";
import FormError from "pages/Admin/components/FormError";
import FormSkeleton from "pages/Admin/components/FormSkeleton";
import { useRegistrarConfig } from "services/terra/registrar/queriers";
import RegistrarConfigForm from "./RegistrarConfigForm";
import {
  RegistrarConfigValues,
  registrarConfigSchema,
} from "./registrarConfigSchema";

export default function RegistrarConfigurer() {
  const { registrarConfig, isLoading, isError } = useRegistrarConfig();
  if (isLoading) return <FormSkeleton />;
  if (isError || !registrarConfig)
    return <FormError errorMessage="failed to load registrar config" />;
  return <RegistrarConfigContext {...registrarConfig} />;
}

function RegistrarConfigContext(props: RegistrarConfig) {
  const pctTaxRate = `${+props.tax_rate * 100}`;
  const pctSplitLiqMax = `${+props.split_to_liquid.max * 100}`;
  const pctSplitLiqMin = `${+props.split_to_liquid.min * 100}`;
  const pctSplitLiqDefault = `${+props.split_to_liquid.default * 100}`;

  const initialConfigPayload: Partial<RegistrarConfigPayload> = {
    accounts_code_id: props.accounts_code_id,
    index_fund_contract: props.index_fund, //addr
    treasury: props.treasury, //addr
    tax_rate: pctTaxRate,
    default_vault: props.default_vault,
    guardians_multisig_addr: props.guardians_multisig_addr,
    endowment_owners_group_addr: props.endowment_owners_group_addr,
    split_max: pctSplitLiqMax,
    split_min: pctSplitLiqMin,
    split_default: pctSplitLiqDefault,
    halo_token: props.halo_token,
    gov_contract: props.gov_contract,
    charity_shares_contract: props.charity_shares_contract,
  };

  const methods = useForm<RegistrarConfigValues>({
    resolver: yupResolver(registrarConfigSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { ...initialConfigPayload, initialConfigPayload },
  });

  return (
    <FormProvider {...methods}>
      <RegistrarConfigForm />
    </FormProvider>
  );
}
