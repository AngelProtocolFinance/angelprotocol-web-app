import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import { chainIDs } from "constants/chainIDs";
import { contracts } from "constants/contracts";
import { denoms } from "constants/currency";
import useWalletContext from "hooks/useWalletContext";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useBalances, useHaloBalance } from "services/terra/queriers";
import { useGetter } from "store/accessors";
import { FundSendValues } from "../fundSendSchema";

export default function useTransferFunds() {
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<FundSendValues>();
  const { showModal } = useSetModal();
  const { wallet } = useWalletContext();
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const cw3address =
    cwContracts === "apTeam"
      ? contracts[wallet?.network.chainID || chainIDs.testnet].apCW3
      : cwContracts.cw3;

  const {
    main: ustBalance,
    terraBalancesLoading,
    isTerraBalancesFailed,
  } = useBalances(denoms.uusd, [], cw3address);

  const { haloBalance, haloBalanceLoading, isHaloBalanceFailed } =
    useHaloBalance(cw3address);

  const isBalancesLoading = haloBalanceLoading || terraBalancesLoading;
  const isBalancesError = isTerraBalancesFailed || isHaloBalanceFailed;

  useEffect(() => {
    if (isBalancesLoading) return;
    if (isBalancesError) {
      showModal(Popup, { message: "failed to get form resources" });
    }
    setValue("haloBalance", haloBalance);
    setValue("ustBalance", ustBalance);
  }, [isBalancesLoading, isBalancesError, haloBalance, ustBalance]);

  function transferFunds(data: FundSendValues) {}

  return {
    transferFunds: handleSubmit(transferFunds),
    isSubmitDisabled:
      isSubmitting ||
      !isValid ||
      !isDirty ||
      isBalancesError ||
      isBalancesLoading,
  };
}
