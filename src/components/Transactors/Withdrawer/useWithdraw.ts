import { useFormContext } from "react-hook-form";
import { terraTags, userTags } from "types/services/terra";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { useGetter, useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { WithdrawValues } from "./types";
import useFieldsAndLimits from "./useFieldsAndLimits";
import useWithrawEstimator from "./useWithdrawEstimator";

export default function useWithdraw() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    getValues,
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<WithdrawValues>();

  const { wallet, tx } = useWithrawEstimator();
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  const accountAddr = getValues("account_addr");
  const { vaultFields } = useFieldsAndLimits(accountAddr);

  function withdraw() {
    dispatch(
      sendTerraTx({
        wallet,
        tx: tx!,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: terraTags.endowment },
            { type: terraTags.user, id: userTags.terra_balance },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    withdraw: handleSubmit(withdraw),
    vaultFields,
    isSubmitDisabled:
      !isValid ||
      !isDirty ||
      form_loading ||
      form_error !== null ||
      isSubmitting,
    isFormLoading: form_loading,
  };
}
