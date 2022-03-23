import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import TransactionPromp from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";
import { app, site } from "constants/routes";
import { useGetter, useSetter } from "store/accessors";
import APAdmin from "contracts/APAdmin";
import Indexfund from "contracts/IndexFund";
import { EmbeddedWasmMsg } from "contracts/types";
import { AllianceEditValues } from "./alllianceEditSchema";

export default function useEditAlliance() {
  const { trigger, reset, getValues } = useFormContext<AllianceEditValues>();
  const navigate = useNavigate();
  const wallet = useConnectedWallet();
  const allianceMembers = useGetter((state) => state.admin.allianceMembers);
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  async function editAlliance() {
    const isValid = await trigger(["description", "title"], {
      shouldFocus: true,
    });
    if (!isValid) return;

    //check if there are changes
    const markedMembers = allianceMembers.filter(
      (member) => member.isAdded || member.isDeleted
    );

    if (markedMembers.length <= 0) {
      showModal<PopupProps>(Popup, { message: "No member changes" });
      return;
    }

    const indexFundContract = new Indexfund(wallet);
    const updateMsgs: EmbeddedWasmMsg[] = markedMembers.map(
      ({ isAdded, isDeleted, ...restMemberData }) =>
        indexFundContract.createEmbeddedAAListUpdateMsg(
          restMemberData,
          isAdded ? "add" : "remove"
        )
    );

    const adminContract = new APAdmin(wallet);

    const proposalTitle = getValues("title");
    const proposalDescription = getValues("description");

    const proposalMsg = adminContract.createProposalMsg(
      proposalTitle,
      proposalDescription,
      updateMsgs
    );

    dispatch(
      sendTerraTx({
        wallet,
        msgs: [proposalMsg],
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.admin, id: admin.proposals },
          ]),
        ],
        redirect: () => navigate(`${site.app}/${app.admin}`),
      })
    );
    showModal(TransactionPromp, {});
    reset();
  }

  return { editAlliance };
}
