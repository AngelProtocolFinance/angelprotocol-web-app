import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { TerraChainIDs } from "@types-lists";
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
      ? contracts[(wallet?.network.chainID as TerraChainIDs) || "bombay-12"]
          .apCW3
      : cwContracts.cw3;

  //cw3 balances
  const {
    main: ustBalance,
    terraBalancesLoading,
    isTerraBalancesFailed,
  } = useBalances("uusd", [], cw3address);

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
