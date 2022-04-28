import { useFormContext } from "react-hook-form";
import { WithdrawResource, WithdrawValues } from "@types-component/withdrawer";
import { multicallTags, terraTags, userTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { useGetter, useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { adminRoutes, appRoutes, siteRoutes } from "constants/routes";
import useWithrawEstimator from "./useWithdrawEstimator";

export default function useWithdraw(resources: WithdrawResource) {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<WithdrawValues>();

  const { wallet, tx } = useWithrawEstimator(resources);
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  function withdraw() {
    dispatch(
      sendTerraTx({
        wallet,
        tx: tx!,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: terraTags.multicall, id: multicallTags.endowmentBalance },
            { type: terraTags.user, id: userTags.terra_balance },
          ]),
        ],
        successLink: {
          url: `${siteRoutes.app}/${appRoutes.endowment_admin}/${resources.accountAddr}/${adminRoutes.proposals}`,
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
