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

    const adminContract = new APAdmin(wallet);

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
        redirect: () => navigate(`${site.app}/${app.admin}`),
      })
    );
    showModal(TransactionPromp, {});
    reset();
  }

  return { editAlliance };
}
