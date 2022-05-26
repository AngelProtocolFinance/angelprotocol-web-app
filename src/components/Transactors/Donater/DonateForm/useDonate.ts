import { useCallback, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import { useModalContext } from "contexts/ModalContext";
import {
  useGetWallet,
  useSetWallet,
} from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { resetFee } from "slices/transaction/transactionSlice";
import { sendEthDonation } from "slices/transaction/transactors/sendEthDonation";
import { denoms } from "constants/currency";
import useEstimator from "../useEstimator";

export default function useDonate() {
  const { providerId, displayCoin, isWalletLoading } = useGetWallet();
  const { networkSwitcher } = useSetWallet();
  const { form_loading, form_error } = useGetter((state) => state.transaction);

  const {
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid, isDirty },
  } = useFormContext<DonateValues>();
  const { showModal } = useModalContext();
  const dispatch = useSetter();
  const { ethTx } = useEstimator();

  const denomRef = useRef<string>(denoms.uusd);
  const token = watch("token");

  const ethSender = useCallback(
    (data: DonateValues) => {
      dispatch(sendEthDonation({ tx: ethTx!, donateValues: data, providerId }));
      showModal(TransactionPrompt, {});
    },
    //eslint-disable-next-line
    [ethTx]
  );

  const denom = token.min_denom;
  const isInCorrectNetwork = token.chainId !== displayCoin.chainId;
  const incorrectNetworkMessage = `To transact ${token.symbol} token, kindly switch wallet network to ${token.chainName}`;

  //reset amount when changing currency
  useEffect(() => {
    if (denomRef.current !== denom) {
      setValue("amount", "", { shouldValidate: true });
      dispatch(resetFee());
    }
    denomRef.current = denom;
    //eslint-disable-next-line
  }, [denom]);

  return {
    donate: handleSubmit(ethSender),
    isInCorrectNetwork,
    incorrectNetworkMessage,
    isSwitchingNetwork: isWalletLoading,
    switchNetwork: networkSwitcher(token),
    isSubmitDisabled:
      form_error !== null || form_loading || !isValid || !isDirty,
    isFormLoading: form_loading,
    to: getValues("to"),
  };
}
