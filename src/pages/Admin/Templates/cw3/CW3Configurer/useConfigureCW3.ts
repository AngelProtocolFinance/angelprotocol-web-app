import { useFormContext } from "react-hook-form";
import {
  CW3ConfigPayload,
  CW3ConfigUpdateMeta,
  CW3ConfigValues,
} from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import CW3 from "contracts/CW3";
import getPayloadDiff from "helpers/getPayloadDiff";
import genDiffMeta from "../../genDiffMeta";

type Key = keyof CW3ConfigPayload;
type Value = CW3ConfigPayload[Key];
export default function useConfigureCW3() {
  const { cw3, proposalLink } = useAdminResources();
  const { wallet } = useGetWallet();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<CW3ConfigValues>();
  const { showModal } = useModalContext();
  const dispatch = useSetter();

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

    const contract = new CW3(wallet, cw3);
    const configUpdateMsg = contract.createEmbeddedUpdateConfigMsg(
      data.height,
      (data.threshold / 100).toFixed(3)
    );

    const configUpdateMeta: CW3ConfigUpdateMeta = {
      type: "cw3_config",
      data: genDiffMeta(diffEntries, initialCW3Config),
    };

    //proposal meta for preview
    const proposalMsg = contract.createProposalMsg(
      title,
      description,
      [configUpdateMsg],
      JSON.stringify(configUpdateMeta)
    );

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [proposalMsg],
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.admin, id: adminTags.proposals },
          ]),
        ],
        successLink: proposalLink,
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
