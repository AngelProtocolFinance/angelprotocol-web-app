import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FundMemberUpdateMeta } from "pages/Admin/types";
import { FundUpdateValues } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetWallet } from "contexts/WalletContext";
import { useGetter } from "store/accessors";
import CW3 from "contracts/CW3";
import IndexFund from "contracts/IndexFund";
import useTxSender from "hooks/useTxSender";

export default function useUpdateFund() {
  const { trigger, reset, getValues } = useFormContext<FundUpdateValues>();
  const { multisig, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const [isLoading, setIsLoading] = useState(false);
  const fundMembers = useGetter((state) => state.admin.fundMembers);
  const { handleError } = useErrorContext();
  const sendTx = useTxSender();

  async function updateFund() {
    try {
      setIsLoading(true);
      const isValid = await trigger(["description", "title"], {
        shouldFocus: true,
      });
      if (!isValid) return;

      const fundId = getValues("fundId");
      if (fundId === "") {
        throw new Error("No fund selected");
      }
      //check if there are changes
      type Diffs = [string[], string[]];
      const [toAdd, toRemove]: Diffs = fundMembers.reduce(
        ([toAdd, toRemove]: Diffs, fundMember) => {
          if (fundMember.isAdded) {
            toAdd.push(fundMember.id);
          }
          if (fundMember.isDeleted) {
            toRemove.push(fundMember.id);
          }
          return [toAdd, toRemove];
        },
        [[], []]
      );

      if (toRemove.length <= 0 && toAdd.length <= 0) {
        throw new Error("No fund member changes");
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

      const adminContract = new CW3(wallet, multisig);
      const proposalTitle = getValues("title");
      const proposalDescription = getValues("description");

      const proposalMsg = adminContract.createProposalMsg(
        proposalTitle,
        proposalDescription,
        [embeddedExecuteMsg],
        JSON.stringify(fundUpdateMembersMeta)
      );

      await sendTx({
        content: { type: "cosmos", val: [proposalMsg] },
        ...propMeta,
      });
      setIsLoading(false);
      reset();
    } catch (err) {
      setIsLoading(false);
      handleError(err);
    }
  }

  return {
    updateFund,
    isSubmitDisabled: isLoading,
  };
}
