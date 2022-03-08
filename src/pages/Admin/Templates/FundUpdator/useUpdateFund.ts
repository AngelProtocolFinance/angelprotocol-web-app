import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import TransactionPromp from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { useHistory } from "react-router-dom";
import Popup, { PopupProps } from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import Indexfund from "contracts/IndexFund";
import Admin from "contracts/Admin";
import { app, site } from "constants/routes";
import { FundUpdateValues } from "./fundUpdatorSchema";

export default function useUpdateFund() {
  const { trigger, reset, getValues } = useFormContext<FundUpdateValues>();
  const history = useHistory();
  const wallet = useConnectedWallet();
  const fundMembers = useGetter((state) => state.admin.fundMembers);
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  async function updateFund() {
    const isValid = await trigger(["description", "title"], {
      shouldFocus: true,
    });
    if (!isValid) return;

    const fundId = getValues("fundId");
    if (fundId === "") {
      showModal<PopupProps>(Popup, { message: "No fund selected" });
      return;
    }
    //check if there are changes
    type Diffs = [string[], string[]];
    const [toAdd, toRemove]: Diffs = fundMembers.reduce(
      ([toAdd, toRemove]: Diffs, fundMember) => {
        if (fundMember.isAdded) {
          toAdd.push(fundMember.addr);
        }
        if (fundMember.isDeleted) {
          toRemove.push(fundMember.addr);
        }
        return [toAdd, toRemove];
      },
      [[], []]
    );

    if (toRemove.length <= 0 && toAdd.length <= 0) {
      showModal<PopupProps>(Popup, { message: "No fund member changes" });
      return;
    }
    const indexFundContract = new Indexfund(wallet);
    const embeddedExecuteMsg = indexFundContract.createEmbeddedUpdateMembersMsg(
      +fundId,
      toAdd,
      toRemove
    );

    const adminContract = new Admin(wallet);
    const proposalTitle = getValues("title");
    const proposalDescription = getValues("description");

    const proposalMsg = adminContract.createProposalMsg(
      proposalTitle,
      proposalDescription,
      [embeddedExecuteMsg]
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
        redirect: () => history.push(`${site.app}/${app.admin}`),
      })
    );
    showModal(TransactionPromp, {});
    reset();
  }

  return { updateFund };
}
