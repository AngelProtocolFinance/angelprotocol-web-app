import { useFormContext } from "react-hook-form";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useModalContext } from "components/ModalContext/ModalContext";
import { sendTerraTx } from "services/transaction/transactors/sendTerraTx";
import { lbp, tags, user } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useGetter, useSetter } from "store/accessors";
import useSwapEstimator from "./useSwapEstimator";
import { SwapValues } from "./types";

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
            { type: tags.lbp, id: lbp.pool },
            { type: tags.user, id: user.halo_balance },
            { type: tags.user, id: user.terra_balance },
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
