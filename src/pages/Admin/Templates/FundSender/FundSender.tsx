import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { chainIDs } from "types/chainIDs";
import { denoms } from "types/denoms";
import FormError from "pages/Admin/components/FormError";
import FormSkeleton from "pages/Admin/components/FormSkeleton";
import { useBalances, useHaloBalance } from "services/terra/queriers";
import { useGetter } from "store/accessors";
import useWalletContext from "hooks/useWalletContext";
import { contracts } from "constants/contracts";
import FundSendForm from "./FundSendForm/FundSendForm";
import { FundSendValues, fundSendSchema } from "./fundSendSchema";

export default function FundSender() {
  const { wallet } = useWalletContext();
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const cw3address =
    cwContracts === "apTeam"
      ? contracts[wallet?.network.chainID || chainIDs.testnet].apCW3
      : cwContracts.cw3;

  //cw3 balances
  const {
    main: ustBalance,
    terraBalancesLoading,
    isTerraBalancesFailed,
  } = useBalances(denoms.uusd, [], cw3address);

  const { haloBalance, haloBalanceLoading, isHaloBalanceFailed } =
    useHaloBalance(cw3address);

  const isBalancesLoading = haloBalanceLoading || terraBalancesLoading;
  const isBalancesError = isTerraBalancesFailed || isHaloBalanceFailed;

  if (isBalancesLoading) return <FormSkeleton />;
  if (isBalancesError)
    return <FormError errorMessage="failed to get cw3 balances" />;

  return <FundSendContext {...{ haloBalance, ustBalance }} />;
}

function FundSendContext(props: { haloBalance: number; ustBalance: number }) {
  const methods = useForm<FundSendValues>({
    resolver: yupResolver(fundSendSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      currency: denoms.uusd,
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
