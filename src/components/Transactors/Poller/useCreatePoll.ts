import { useFormContext } from "react-hook-form";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { tags, user } from "services/terra/tags";
import { useGetter, useSetter } from "store/accessors";
import Halo from "contracts/Halo";
import useCreatePollEstimate from "./useCreatePollEstimate";
import { CreatePollValues } from "./types";

export default function useCreatePoll() {
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<CreatePollValues>();

  const { form_error, form_loading } = useGetter((state) => state.transaction);
  const { wallet, maxFee } = useCreatePollEstimate();
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  async function createPoll(data: CreatePollValues) {
    const contract = new Halo(wallet);
    const { amount, title, description, link } = data;
    const pollMsgs = await contract.createPollMsgs(
      +amount,
      title,
      description,
      link
    );

    dispatch(
      sendTerraTx({
        wallet,
        tx: { msgs: pollMsgs, fee: maxFee },
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.gov },
            { type: tags.user, id: user.halo_balance },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    createPoll: handleSubmit(createPoll),
    isSubmitDisabled:
      !isValid || !isDirty || !!form_error || form_loading || isSubmitting,
    isFormLoading: form_loading,
  };
}
