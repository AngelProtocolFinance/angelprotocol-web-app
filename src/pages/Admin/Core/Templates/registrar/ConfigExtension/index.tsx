import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { RegistrarConfig, RegistrarConfigPayload } from "types/contracts";
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
  const initial: RegistrarConfigPayload = {
    accountsContract: p.accountsContract,
    taxRate: 1, // not present in config
    rebalance: p.rebalance,
    approved_charities: [], // not present in config
    splitMax: p.splitToLiquid.max,
    splitMin: p.splitToLiquid.min,
    splitDefault: p.splitToLiquid.defaultSplit,
    collectorShare: p.collectorShare,
    subdaoGovCode: p.subdaoGovCode,
    subdaoCw20TokenCode: p.subdaoCw20TokenCode,
    subdaoBondingTokenCode: p.subdaoBondingTokenCode,
    subdaoCw900Code: p.subdaoCw900Code,
    subdaoDistributorCode: p.subdaoDistributorCode,
    subdaoEmitter: p.subdaoEmitter,
    donationMatchCode: p.donationMatchCode,
    indexFundContract: p.indexFundContract,
    govContract: p.govContract,
    treasury: p.treasury,
    donationMatchCharitesContract: p.donationMatchCharitesContract,
    donationMatchEmitter: p.donationMatchEmitter,
    haloToken: p.haloToken,
    haloTokenLpContract: p.haloTokenLpContract,
    charitySharesContract: p.charitySharesContract,
    fundraisingContract: p.fundraisingContract,
    applicationsReview: p.applicationsReview,
    swapsRouter: p.swapsRouter,
    multisigFactory: p.multisigFactory,
    multisigEmitter: p.multisigEmitter,
    charityProposal: p.charityProposal,
    lockedWithdrawal: p.lockedWithdrawal,
    proxyAdmin: p.proxyAdmin,
    usdcAddress: p.usdcAddress,
    wethAddress: p.wethAddress,
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
