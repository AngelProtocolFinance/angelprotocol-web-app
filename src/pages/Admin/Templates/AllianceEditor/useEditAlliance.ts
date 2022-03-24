import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import TransactionPromp from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import { EmbeddedWasmMsg } from "contracts/types";
import { AllianceEditValues } from "./alllianceEditSchema";
import { proposalSuccessLink } from "../constants";

export default function useEditAlliance() {
  const { trigger, reset, getValues } = useFormContext<AllianceEditValues>();
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

    const adminContract = new Admin("apTeam", wallet);

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
        successLink: proposalSuccessLink,
        successMessage: "Alliance member update proposal submitted",
      })
    );
    showModal(TransactionPromp, {});
    reset();
  }

  return { editAlliance };
}
