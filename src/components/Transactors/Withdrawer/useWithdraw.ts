import { useFormContext } from "react-hook-form";
import { multicall, tags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { useModalContext } from "components/ModalContext/ModalContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { admin, app, site } from "constants/routes";
import { WithdrawResource, WithdrawValues } from "./types";
import useWithrawEstimator from "./useWithdrawEstimator";

export default function useWithdraw(resources: WithdrawResource) {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<WithdrawValues>();

  const { wallet, tx } = useWithrawEstimator(resources);
  const { showModal } = useModalContext();
  const dispatch = useSetter();

  function withdraw() {
    dispatch(
      sendTerraTx({
        wallet,
        tx: tx!,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.multicall, id: multicall.endowmentBalance },
            { type: tags.multicall, id: multicall.terraBalances },
          ]),
        ],
        successLink: {
          url: `${site.app}/${app.endowment_admin}/${resources.accountAddr}/${admin.proposals}`,
          description: "Go to proposals",
        },
        successMessage: "Withdraw proposal successfully created!",
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    withdraw: handleSubmit(withdraw),
    isSubmitDisabled:
      !isValid ||
      !isDirty ||
      form_loading ||
      form_error !== null ||
      isSubmitting,
    isFormLoading: form_loading,
  };
}
