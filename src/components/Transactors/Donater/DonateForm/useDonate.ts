import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { resetFee, setFormError } from "slices/transaction/transactionSlice";
import { sendEthDonation } from "slices/transaction/transactors/sendEthDonation";
import switchNetwork from "helpers/switchNetwork";
import { denoms } from "constants/currency";
import { DonateValues } from "../types";
import useEstimator from "../useEstimator";

export default function useDonate() {
  const { providerId, displayCoin, isWalletLoading } = useGetWallet();
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

  const ethSender = (data: DonateValues) => {
    dispatch(sendEthDonation({ tx: ethTx!, donateValues: data, providerId }));
    showModal(TransactionPrompt, {});
  };

  async function handleNetworkChange() {
    try {
      if (!providerId) {
        dispatch(setFormError("Wallet is not connected"));
        return;
      }
      await switchNetwork(token, providerId);
    } catch (err) {
      console.error(err);
    }
  }

  const denom = token.min_denom;
  const isInCorrectNetwork = token.chainId === displayCoin.chainId;
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
    correctNetworkInfo: {
      name: token.chainName,
      symbol: token.symbol,
    },
    isSwitchingNetwork: isWalletLoading,
    handleNetworkChange,
    isSubmitDisabled:
      form_error !== null ||
      form_loading ||
      !isValid ||
      !isDirty ||
      isWalletLoading ||
      !isInCorrectNetwork,
    isFormLoading: form_loading,
    to: getValues("to"),
  };
}
