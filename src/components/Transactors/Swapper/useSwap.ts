import { useFormContext } from "react-hook-form";
import { SwapValues } from "./types";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction";
import useSwapEstimator from "./useSwapEstimator";

export default function useSwap() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<SwapValues>();

  const { tx, wallet } = useSwapEstimator();
  const dispatch = useSetter();

  const isBuy = watch("is_buy");
  function switchCurrency() {
    setValue("is_buy", !isBuy);
  }

  function swap() {
    dispatch(
      sendCosmosTx({
        wallet,
        tx: tx!,
      })
    );
  }

  return {
    swap: handleSubmit(swap),
    switchCurrency,
    isSubmitDisabled:
      !isValid ||
      !isDirty ||
      form_loading ||
      form_error !== null ||
      isSubmitting,
    isFormLoading: form_loading,
  };
}
