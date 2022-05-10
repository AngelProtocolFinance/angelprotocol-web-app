import { useFormContext } from "react-hook-form";
import { CreatePollValues } from "@types-component/poller";
import { terraTags, userTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import Halo from "contracts/Halo";
import useCreatePollEstimate from "./useCreatePollEstimate";

export default function useCreatePoll() {
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<CreatePollValues>();

  const { form_error, form_loading } = useGetter((state) => state.transaction);
  const { wallet, maxFee } = useCreatePollEstimate();
  const { showModal } = useModalContext();
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
            { type: terraTags.gov },
            { type: terraTags.user, id: userTags.halo_balance },
          ]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    createPoll: handleSubmit(createPoll),
    isSubmitDisabled:
      !isValid ||
      !isDirty ||
      form_error !== null ||
      form_loading ||
      isSubmitting,
    isFormLoading: form_loading,
  };
}
