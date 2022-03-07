import { useFormContext } from "react-hook-form";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { sendTerraTx } from "services/transaction/transactors/sendTerraTx";
import { tags, user } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useGetter, useSetter } from "store/accessors";
import useWithrawEstimator from "./useWithdrawEstimator";
import { WithdrawValues } from "./types";
import useFieldsAndLimits from "./useFieldsAndLimits";

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
            { type: tags.endowment },
            { type: tags.user, id: user.terra_balance },
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
