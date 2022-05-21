import { useFormContext } from "react-hook-form";
import { SwapValues } from "./types";
import { multicallTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useModalContext } from "contexts/ModalContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
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

  const { wallet, tx } = useSwapEstimator();
  const { showModal } = useModalContext();
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
          terra.util.invalidateTags([
            { type: terraTags.multicall, id: multicallTags.terraBalances },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
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
