import { useFormContext } from "react-hook-form";
import { SwapValues } from "./types";
import { invalidateJunoTags } from "services/juno";
import { junoTags, multicallTags } from "services/juno/tags";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
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
      sendTerraTx({
        wallet,
        tx: tx!,
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.multicall, id: multicallTags.terraBalances },
          ]),
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
