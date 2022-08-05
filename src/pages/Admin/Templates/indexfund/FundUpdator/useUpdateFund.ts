import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FundMemberUpdateMeta } from "pages/Admin/types";
import { FundUpdateValues } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPromp from "components/Transactor/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import CW3 from "contracts/CW3";
import IndexFund from "contracts/IndexFund";

export default function useUpdateFund() {
  const { trigger, reset, getValues } = useFormContext<FundUpdateValues>();
  const { cw3, proposalLink } = useAdminResources();
  const { wallet } = useGetWallet();
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
      const indexFundContract = new IndexFund(wallet);
      const embeddedExecuteMsg =
        indexFundContract.createEmbeddedUpdateMembersMsg(
          +fundId,
          toAdd,
          toRemove
        );

      const fundDetails = await indexFundContract.getFundDetails(+fundId);

      const fundUpdateMembersMeta: FundMemberUpdateMeta = {
        type: "if_members",
        data: { fundId: fundId, fundName: fundDetails.name, toRemove, toAdd },
      };

      const adminContract = new CW3(wallet, cw3);
      const proposalTitle = getValues("title");
      const proposalDescription = getValues("description");

      const proposalMsg = adminContract.createProposalMsg(
        proposalTitle,
        proposalDescription,
        [embeddedExecuteMsg],
        JSON.stringify(fundUpdateMembersMeta)
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
