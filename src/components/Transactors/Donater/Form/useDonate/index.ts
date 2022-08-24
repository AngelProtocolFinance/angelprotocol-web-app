import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "../../types";
import { InitialStage } from "slices/transaction/types";
import { useGetter, useSetter } from "store/accessors";
import { resetFee } from "slices/transaction/transactionSlice";
import {
  sendCosmosDonation,
  sendEthDonation,
  sendTerraDonation,
} from "slices/transaction/transactors";
import useEstimator from "./useEstimator";

export default function useDonate() {
  const terraWallet = useConnectedWallet(); // sendTerraDonation requires this wallet to send donations
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
  const { evmTx, terraTx, cosmosTx, chain } = useEstimator();
  const symbolRef = useRef<string>();
  const token = watch("token");

  function sendTx(data: DonateValues) {
    // if (isKycRequired && !isKycCompleted) {
    //   showKycForm();
    //   return;
    // }
    switch (chain.type) {
      case "evm-native":
        dispatch(sendEthDonation({ chain, tx: evmTx!, donateValues: data }));
        break;
      case "terra-native":
        dispatch(
          sendTerraDonation({
            wallet: terraWallet,
            chain,
            tx: terraTx!,
            donateValues: data,
            kycData,
          })
        );
        break;
      case "juno-native":
        dispatch(
          sendCosmosDonation({
            chain,
            tx: cosmosTx!,
            donateValues: data,
            kycData,
          })
        );
        break;
      default:
        return;
    }
  }

  //reset amount when changing currency
  useEffect(() => {
    if (symbolRef.current !== token?.symbol) {
      setValue("amount", "", { shouldValidate: true });
      dispatch(resetFee());
    }
    symbolRef.current = token?.symbol;
    //eslint-disable-next-line
  }, [token?.symbol]);

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
      !isKycCompleted,
    isFormLoading: form_loading,
    to: getValues("to"),
  };
}
