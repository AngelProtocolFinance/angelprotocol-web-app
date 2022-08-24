import { useFormContext } from "react-hook-form";
import { SwapValues } from "./types";
import { apesTags, customTags, invalidateApesTags } from "services/apes";
import { invalidateJunoTags } from "services/juno";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import useSwapEstimator from "./useSwapEstimator";

export default function useSwap() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<SwapValues>();

  const { tx, chain } = useSwapEstimator();
  const dispatch = useSetter();

  const isBuy = watch("is_buy");
  function switchCurrency() {
    setValue("is_buy", !isBuy);
  }

  function swap() {
    dispatch(
      sendCosmosTx({
        chain,
        tx: tx!,
        tagPayloads: [
          invalidateJunoTags([]),
          invalidateApesTags([{ type: apesTags.custom, id: customTags.chain }]),
        ],
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
