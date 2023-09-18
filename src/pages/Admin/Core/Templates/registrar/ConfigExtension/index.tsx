import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { RegistrarConfig, RegistrarConfigUpdate } from "types/contracts";
import { useContractQuery } from "services/juno";
import { FormError, FormSkeleton } from "components/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function ConfigExtension() {
  const {
    data: config,
    isLoading,
    isError,
  } = useContractQuery("registrar.config", {});
  if (isLoading) return <FormSkeleton />;
  if (isError || !config)
    return <FormError errorMessage="failed to load registrar config" />;
  return <Context {...config} />;
}

function Context(p: RegistrarConfig) {
  const initial: RegistrarConfigUpdate = {
    accountsContract: p.accountsContract,
    apTeamMultisig: p.apTeamMultisig,
    indexFundContract: p.indexFundContract,
    haloToken: p.haloToken,
    govContract: p.govContract,
    fundraisingContract: p.fundraisingContract,
    treasury: p.treasury,
    uniswapRouter: p.uniswapRouter,
    uniswapFactory: p.uniswapFactory,
    multisigFactory: p.multisigFactory,
    multisigEmitter: p.multisigEmitter,
    charityApplications: p.charityApplications,
    proxyAdmin: p.proxyAdmin,
    usdcAddress: p.usdcAddress,
    wMaticAddress: p.wMaticAddress,
    gasFwdFactory: p.gasFwdFactory,
  };

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { ...initial, initial },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
