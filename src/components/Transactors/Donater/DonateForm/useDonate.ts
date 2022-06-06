import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { resetFee } from "slices/transaction/transactionSlice";
import { sendEthDonation } from "slices/transaction/transactors/sendEthDonation";
import { sendTerraDonation } from "slices/transaction/transactors/sendTerraDonation";
import useEstimator from "../useEstimator";

export default function useDonate() {
  const { providerId, isWalletLoading, walletAddr, chainId } = useGetWallet();
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
  const { evmTx, terraTx } = useEstimator();
  const symbolRef = useRef<string>();
  const token = watch("token");

  function sendTx(data: DonateValues) {
    switch (token.type) {
      case "evm-native":
      case "erc20":
        dispatch(
          sendEthDonation({ tx: evmTx!, donateValues: data, providerId })
        );
        break;
      case "terra-native":
      case "cw20":
        dispatch(
          sendTerraDonation({ tx: terraTx!, donateValues: data, walletAddr })
        );
        break;
      default:
        return;
    }
    showModal(TransactionPrompt, {});
  }

  const symbol = token.symbol;
  const isInCorrectNetwork = token.chain_id === chainId;

  //reset amount when changing currency
  useEffect(() => {
    if (symbolRef.current !== symbol) {
      setValue("amount", "", { shouldValidate: true });
      dispatch(resetFee());
    }
    symbolRef.current = symbol;
    //eslint-disable-next-line
  }, [symbol]);

  return {
    donate: handleSubmit(sendTx),
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
