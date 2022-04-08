import { useParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { EndowmentAddrParams } from "pages/EndowmentAdmin/types";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import getPayloadDiff from "helpers/getPayloadDiff";
import Admin from "contracts/Admin";
import genProposalsLink from "../genProposalsLink";
import { CW3ConfigPayload, CW3ConfigValues } from "./cw3ConfigSchema";
import { ProposalMeta } from "pages/Admin/types";
import useWalletContext from "hooks/useWalletContext";
import { proposalTypes } from "constants/routes";
import genDiffMeta from "../genDiffMeta";

type Key = keyof CW3ConfigPayload;
type Value = CW3ConfigPayload[Key];
export default function useConfigureCW3() {
  const { wallet } = useWalletContext();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<CW3ConfigValues>();
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  const { address: endowmentAddr } = useParams<EndowmentAddrParams>();
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);

  async function configureCW3({
    title,
    description,
    initialCW3Config,
    ...data
  }: CW3ConfigValues) {
    const diff = getPayloadDiff(initialCW3Config, data);
    const diffEntries = Object.entries(diff) as [Key, Value][];
    if (diffEntries.length <= 0) {
      showModal(Popup, { message: "no changes made" });
      return;
    }

    const adminContract = new Admin(cwContracts, wallet);
    const configUpdateMsg = adminContract.createEmbeddedUpdateConfigMsg(
      data.height,
      (data.threshold / 100).toFixed(3)
    );

    const configUpdateMeta: ProposalMeta = {
      type: proposalTypes.adminGroup_updateCW3Config,
      data: genDiffMeta(diffEntries, initialCW3Config),
    };

    //proposal meta for preview
    const proposalMsg = adminContract.createProposalMsg(
      title,
      description,
      [configUpdateMsg],
      JSON.stringify(configUpdateMeta)
    );

    dispatch(
      sendTerraTx({
        msgs: [proposalMsg],
        wallet,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.admin, id: admin.proposals },
          ]),
        ],
        successLink: genProposalsLink(cwContracts, endowmentAddr),
        successMessage: "Config update proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    configureCW3: handleSubmit(configureCW3),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
