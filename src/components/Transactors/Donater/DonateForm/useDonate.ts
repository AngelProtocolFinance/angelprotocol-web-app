import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import { InitialStage } from "slices/transaction/types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useGetter, useSetter } from "store/accessors";
import { resetFee } from "slices/transaction/transactionSlice";
import { sendEthDonation } from "slices/transaction/transactors/sendEthDonation";
import { sendTerraDonation } from "slices/transaction/transactors/sendTerraDonation";
import useEstimator from "../useEstimator";

export default function useDonate() {
  const { wallet, isWalletLoading } = useGetWallet();
  const { form_loading, form_error, stage } = useGetter(
    (state) => state.transaction
  );

  const {
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid, isDirty },
  } = useFormContext<DonateValues>();
  const dispatch = useSetter();
  const { evmTx, terraTx } = useEstimator();
  const symbolRef = useRef<string>();
  const token = watch("token");

  function sendTx(data: DonateValues) {
    // if (isKycRequired && !isKycCompleted) {
    //   showKycForm();
    //   return;
    // }
    switch (token.type) {
      case "evm-native":
      case "erc20":
        dispatch(sendEthDonation({ wallet, tx: evmTx!, donateValues: data }));
        break;
      case "terra-native":
      case "cw20":
        dispatch(
          sendTerraDonation({
            wallet,
            tx: terraTx!,
            donateValues: data,
            kycData,
          })
        );
        break;
      default:
        return;
    }
  }

  const symbol = token.symbol;
  const isInCorrectNetwork = token.chain_id === wallet?.chainId;

  //reset amount when changing currency
  useEffect(() => {
    if (symbolRef.current !== symbol) {
      setValue("amount", "", { shouldValidate: true });
      dispatch(resetFee());
    }
    symbolRef.current = symbol;
    //eslint-disable-next-line
  }, [symbol]);

  const { kycData } = stage as InitialStage;
  const isKycRequired = getValues("isKycDonorOnly") === true;
  const isKycCompleted = isKycRequired ? kycData !== undefined : true;

  return {
    donate: handleSubmit(sendTx),
    isSubmitDisabled:
      form_error !== null ||
      form_loading ||
      !isValid ||
      !isDirty ||
      isWalletLoading ||
      !isInCorrectNetwork ||
      !isKycCompleted,
    isFormLoading: form_loading,
    to: getValues("to"),
  };
}
