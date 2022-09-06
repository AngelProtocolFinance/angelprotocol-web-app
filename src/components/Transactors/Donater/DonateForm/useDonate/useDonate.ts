import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "../../types";
import { InitialStage } from "slices/transaction/types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useGetter, useSetter } from "store/accessors";
import { resetFee } from "slices/transaction/transactionSlice";
import {
  sendCosmosDonation,
  sendEthDonation,
  sendTerraDonation,
} from "slices/transaction/transactors";
import useEstimator from "./useEstimator";

export default function useDonate() {
  const { wallet, isLoading } = useGetWallet();
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
  const { evmTx, terraTx, cosmosTx } = useEstimator();
  const symbolRef = useRef<string>();
  const token = watch("token");

  function sendTx(data: DonateValues) {
    switch (wallet?.chain.type) {
      case "evm-native":
        dispatch(sendEthDonation({ wallet, tx: evmTx!, donateValues: data }));
        break;
      case "terra-native":
        dispatch(
          sendTerraDonation({
            wallet: terraWallet,
            chain: wallet.chain,
            tx: terraTx!,
            donateValues: data,
            kycData,
          })
        );
        break;
      case "juno-native":
        dispatch(
          sendCosmosDonation({
            wallet,
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
  const isKycRequired = !!getValues("isKycDonorOnly");
  const isKycCompleted = isKycRequired && !!kycData;

  return {
    donate: handleSubmit(sendTx),
    isSubmitDisabled:
      form_error !== null ||
      form_loading ||
      !isValid ||
      !isDirty ||
      isLoading ||
      !isKycCompleted,
    isFormLoading: form_loading,
    to: getValues("to"),
  };
}
