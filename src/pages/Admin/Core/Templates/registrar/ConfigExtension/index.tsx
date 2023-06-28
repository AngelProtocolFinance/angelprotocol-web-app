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
    splitMax: p.splitToLiquid.max,
    splitMin: p.splitToLiquid.min,
    splitDefault: p.splitToLiquid.defaultSplit,
    collectorShare: p.collectorShare,
    subdaoGovContract: p.subdaoGovContract,
    subdaoTokenContract: p.subdaoTokenContract,
    subdaoBondingTokenContract: p.subdaoBondingTokenContract,
    subdaoCw900Contract: p.subdaoCw900Contract,
    subdaoDistributorContract: p.subdaoDistributorContract,
    subdaoEmitter: p.subdaoEmitter,
    donationMatchContract: p.donationMatchContract,
    indexFundContract: p.indexFundContract,
    govContract: p.govContract,
    treasury: p.treasury,
    donationMatchCharitesContract: p.donationMatchCharitesContract,
    donationMatchEmitter: p.donationMatchEmitter,
    haloToken: p.haloToken,
    haloTokenLpContract: p.haloTokenLpContract,
    charitySharesContract: p.charitySharesContract,
    fundraisingContract: p.fundraisingContract,
    uniswapRouter: p.uniswapRouter,
    uniswapFactory: p.uniswapFactory,
    multisigFactory: p.multisigFactory,
    multisigEmitter: p.multisigEmitter,
    charityApplications: p.charityApplications,
    lockedWithdrawal: p.lockedWithdrawal,
    proxyAdmin: p.proxyAdmin,
    usdcAddress: p.usdcAddress,
    wMaticAddress: p.wMaticAddress,
    cw900lvAddress: p.cw900lvAddress,
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
