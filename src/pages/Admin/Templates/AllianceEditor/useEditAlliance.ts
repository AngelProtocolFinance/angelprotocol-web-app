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
    type Diffs = [string[], string[]];
    const [toAdd, toRemove]: Diffs = allianceMembers.reduce(
      ([toAdd, toRemove]: Diffs, member) => {
        if (member.isAdded) {
          toAdd.push(member.address);
        }
        if (member.isDeleted) {
          toRemove.push(member.address);
        }
        return [toAdd, toRemove];
      },
      [[], []]
    );

    if (toRemove.length <= 0 && toAdd.length <= 0) {
      showModal<PopupProps>(Popup, { message: "No member changes" });
      return;
    }

    const indexFundContract = new Indexfund(wallet);
    const embeddedExecMsg = indexFundContract.createEmbeddedUpdateTCAMsg(
      toAdd,
      toRemove
    );

    const adminContract = new Admin("apTeam", wallet);

    const proposalTitle = getValues("title");
    const proposalDescription = getValues("description");

    const proposalMsg = adminContract.createProposalMsg(
      proposalTitle,
      proposalDescription,
      [embeddedExecMsg]
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
