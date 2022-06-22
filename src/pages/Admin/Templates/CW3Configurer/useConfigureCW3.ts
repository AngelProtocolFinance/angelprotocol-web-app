import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  CW3ConfigPayload,
  CW3ConfigUpdateMeta,
  CW3ConfigValues,
} from "pages/Admin/types";
import { EndowmentAdminParams } from "pages/EndowmentAdmin/types";
import { adminTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import Admin from "contracts/Admin";
import getPayloadDiff from "helpers/getPayloadDiff";
import genDiffMeta from "../genDiffMeta";
import genProposalsLink from "../genProposalsLink";

type Key = keyof CW3ConfigPayload;
type Value = CW3ConfigPayload[Key];
export default function useConfigureCW3() {
  const { wallet } = useGetWallet();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<CW3ConfigValues>();
  const { showModal } = useModalContext();
  const dispatch = useSetter();

  const { address: endowmentAddr } = useParams<EndowmentAdminParams>();
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

    const adminContract = new Admin(cwContracts, wallet?.address);
    const configUpdateMsg = adminContract.createEmbeddedUpdateConfigMsg(
      data.height,
      (data.threshold / 100).toFixed(3)
    );

    const configUpdateMeta: CW3ConfigUpdateMeta = {
      type: "admin-group-update-cw3-config",
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
        wallet,
        msgs: [proposalMsg],
        tagPayloads: [
          terra.util.invalidateTags([
            { type: terraTags.admin, id: adminTags.proposals },
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
