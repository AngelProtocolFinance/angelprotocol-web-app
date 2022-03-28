import { useConnectedWallet } from "@terra-money/use-wallet";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import { useState } from "react";
import { useSetter } from "store/accessors";
import { proposalSuccessLink } from "../constants";

export default function useConfigureFund() {
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  const [isSubmitting, setSubmitting] = useState(false);

  async function configureFund() {
    dispatch(
      sendTerraTx({
        msgs: [],
        wallet,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.admin, id: admin.proposals },
          ]),
        ],
        successLink: proposalSuccessLink,
        successMessage: "Create fund proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});

    setSubmitting(false);
  }

  return { configureFund, isSubmitting };
}
