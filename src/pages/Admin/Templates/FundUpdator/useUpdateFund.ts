import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { proposalTypes } from "types/routes";
import { ProposalMeta } from "pages/Admin/types";
import { adminTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { useGetter, useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";
import TransactionPromp from "components/TransactionStatus/TransactionPrompt";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import useWalletContext from "hooks/useWalletContext";
import genProposalsLink from "../genProposalsLink";
import { FundUpdateValues } from "./fundUpdatorSchema";

export default function useUpdateFund() {
  const { trigger, reset, getValues } = useFormContext<FundUpdateValues>();
  const [isLoading, setIsLoading] = useState(false);
  const { wallet } = useWalletContext();
  const fundMembers = useGetter((state) => state.admin.fundMembers);
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  async function updateFund() {
    try {
      setIsLoading(true);
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
      const embeddedExecuteMsg =
        indexFundContract.createEmbeddedUpdateMembersMsg(
          +fundId,
          toAdd,
          toRemove
        );

      const fundDetails = await indexFundContract.getFundDetails(+fundId);

      const fundUpdateMembersMeta: ProposalMeta = {
        type: proposalTypes.indexFund_updateFundMembers,
        data: { fundId: fundId, fundName: fundDetails.name, toRemove, toAdd },
      };

      const adminContract = new Admin("apTeam", wallet);
      const proposalTitle = getValues("title");
      const proposalDescription = getValues("description");

      const proposalMsg = adminContract.createProposalMsg(
        proposalTitle,
        proposalDescription,
        [embeddedExecuteMsg],
        JSON.stringify(fundUpdateMembersMeta)
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
          successLink: genProposalsLink("apTeam"),
          successMessage: "Fund member proposal submitted",
        })
      );
      setIsLoading(false);
      showModal(TransactionPromp, {});
      reset();
    } catch (err) {
      setIsLoading(false);
    }
  }

  return { updateFund, isSubmitDisabled: isLoading };
}
