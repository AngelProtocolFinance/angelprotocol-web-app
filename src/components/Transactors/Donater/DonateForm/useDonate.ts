import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import { InitialStage } from "slices/transaction/types";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useGetter, useSetter } from "store/accessors";
import { resetFee, setStage } from "slices/transaction/transactionSlice";
import { sendEthDonation } from "slices/transaction/transactors/sendEthDonation";
import { sendTerraDonation } from "slices/transaction/transactors/sendTerraDonation";
import useEstimator from "../useEstimator";

export default function useDonate() {
  const { providerId, isWalletLoading, walletAddr, chainId } = useGetWallet();
  const { form_loading, form_error, stage } = useGetter(
    (state) => state.transaction
  );
  const { kycData } = stage as InitialStage;

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
  const isKycRequired = getValues("isKycDonorOnly") === true;
  const isKycCompleted = kycData !== undefined;

  function showKycForm() {
    dispatch(
      setStage({
        step: "kyc",
        kycData: {
          fullName: "string", // "John Doe"
          email: "string", // "john@doe.email.com"
          streetAddress: "string",
          city: "string",
          state: "string",
          zipCode: "string", //2000
          country: "string",
          consent_tax: true,
          consent_marketing: true,
        },
      })
    );
  }

  function sendTx(data: DonateValues) {
    // if (isKycRequired && !isKycCompleted) {
    //   showKycForm();
    //   return;
    // }
    switch (token.type) {
      case "evm-native":
      case "erc20":
        dispatch(
          sendEthDonation({
            tx: evmTx!,
            donateValues: data,
            providerId,
            kycData,
          })
        );
        break;
      case "terra-native":
      case "cw20":
        dispatch(
          sendTerraDonation({
            providerId,
            tx: terraTx!,
            donateValues: data,
            walletAddr,
            kycData,
          })
        );
        break;
      default:
        return;
    }
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
    // !isKycCompleted,
    isFormLoading: form_loading,
    isKycCompleted,
    isKycRequired,
    showKycForm,
    to: getValues("to"),
  };
}
