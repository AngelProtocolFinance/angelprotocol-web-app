import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FundSendValues } from "@types-page/admin";
import FormError from "pages/Admin/components/FormError";
import FormSkeleton from "pages/Admin/components/FormSkeleton";
import { useTerraBalances } from "services/terra/multicall/queriers";
import { useGetter } from "store/accessors";
import useWalletContext from "hooks/useWalletContext";
import getTokenBalance from "helpers/getTokenBalance";
import { chainIDs } from "constants/chainIDs";
import { contracts } from "constants/contracts";
import { denoms } from "constants/currency";
import FundSendForm from "./FundSendForm/FundSendForm";
import { fundSendSchema } from "./fundSendSchema";

export default function FundSender() {
  const { wallet } = useWalletContext();
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const cw3address =
    cwContracts === "apTeam"
      ? contracts[wallet?.network.chainID || chainIDs.terra_test].apCW3
      : cwContracts.cw3;

  //cw3 balances
  const { terraBalances, isTerraBalancesError, isTerraBalancesLoading } =
    useTerraBalances(cw3address);
  const haloBalance = getTokenBalance(terraBalances, denoms.halo);
  const ustBalance = getTokenBalance(terraBalances, denoms.uusd);

  if (isTerraBalancesLoading) return <FormSkeleton />;
  if (isTerraBalancesError) {
    return <FormError errorMessage="failed to get cw3 balances" />;
  }
  return <FundSendContext {...{ haloBalance, ustBalance }} />;
}

function FundSendContext(props: { haloBalance: number; ustBalance: number }) {
  const methods = useForm<FundSendValues>({
    resolver: yupResolver(fundSendSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      currency: "uusd",
      haloBalance: props.haloBalance,
      ustBalance: props.ustBalance,
    },
  });

  return (
    <FormProvider {...methods}>
      <FundSendForm />
    </FormProvider>
  );
}
