import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FundMemberUpdateMeta } from "pages/Admin/types";
import { FundUpdateValues } from "pages/Admin/types";
import { adminTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPromp from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import genProposalsLink from "../genProposalsLink";

export default function useUpdateFund() {
  const { trigger, reset, getValues } = useFormContext<FundUpdateValues>();
  const { walletAddr, displayCoin, providerId } = useGetWallet();
  const [isLoading, setIsLoading] = useState(false);
  const fundMembers = useGetter((state) => state.admin.fundMembers);
  const { showModal } = useModalContext();
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
        showModal(Popup, { message: "No fund selected" });
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
        showModal(Popup, { message: "No fund member changes" });
        return;
      }
      const indexFundContract = new Indexfund(walletAddr);
      const embeddedExecuteMsg =
        indexFundContract.createEmbeddedUpdateMembersMsg(
          +fundId,
          toAdd,
          toRemove
        );

      const fundDetails = await indexFundContract.getFundDetails(+fundId);

      const fundUpdateMembersMeta: FundMemberUpdateMeta = {
        type: "indexfund-update-fund-members",
        data: { fundId: fundId, fundName: fundDetails.name, toRemove, toAdd },
      };

      const adminContract = new Admin("apTeam", walletAddr);
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
          providerId,
          feeBalance: displayCoin.balance,
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
