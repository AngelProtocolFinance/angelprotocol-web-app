import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { RegistrarConfigValues } from "pages/Admin/types";
import { RegistrarConfig, RegistrarConfigPayload } from "types/contracts";
import { useRegistrarConfig } from "services/juno/registrar/queriers";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function Config() {
  const { registrarConfig, isLoading, isError } = useRegistrarConfig();
  if (isLoading) return <FormSkeleton />;
  if (isError || !registrarConfig)
    return <FormError errorMessage="failed to load registrar config" />;
  return <RegistrarConfigContext {...registrarConfig} />;
}

function RegistrarConfigContext(props: RegistrarConfig) {
  const pctSplitLiqMax = `${+props.split_to_liquid.max * 100}`;
  const pctSplitLiqMin = `${+props.split_to_liquid.min * 100}`;
  const pctSplitLiqDefault = `${+props.split_to_liquid.default * 100}`;

  const initialConfigPayload: Partial<RegistrarConfigPayload> = {
    accounts_contract: props.accounts_contract,
    index_fund_contract: props.index_fund_contract, //addr
    treasury: props.treasury, //addr
    split_max: pctSplitLiqMax,
    split_min: pctSplitLiqMin,
    split_default: pctSplitLiqDefault,
    halo_token: props.halo_token,
    gov_contract: props.gov_contract,
    charity_shares_contract: props.charity_shares_contract,
    applications_review: props.applications_review,
    applications_impact_review: props.applications_impact_review,
  };

  const methods = useForm<RegistrarConfigValues>({
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
