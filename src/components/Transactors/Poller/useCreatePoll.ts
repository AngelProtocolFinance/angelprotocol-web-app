import { useFormContext } from "react-hook-form";
import { multicall, tags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { useModalContext } from "components/ModalContext/ModalContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import Gov from "contracts/Gov";
import { CreatePollValues } from "./types";
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
    const contract = new Gov(wallet);
    const { amount, title, description, link } = data;
    const pollMsg = await contract.createPollMsgs(
      +amount,
      title,
      description,
      link
    );

    dispatch(
      sendTerraTx({
        wallet,
        tx: { msgs: [pollMsg], fee: maxFee },
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.gov },
            { type: tags.multicall, id: multicall.terraBalances },
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
