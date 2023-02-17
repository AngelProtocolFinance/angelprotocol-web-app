import { useAdminResources } from "@/pages/Admin/Guard";
import { useGetter } from "@/store/accessors";
import { useErrorContext } from "@ap/contexts";
import { useGetWallet } from "@ap/contexts/wallet-context";
import { CW3, IndexFund } from "@ap/contracts";
import useCosmosTxSender from "@ap/hooks/use-cosmos-tx-sender";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FundMemberUpdateMeta } from "@/pages/Admin/types";
import { FundUpdateValues } from "@/pages/Admin/types";

export default function useUpdateFund() {
  const { trigger, reset, getValues } = useFormContext<FundUpdateValues>();
  const { cw3, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const [isLoading, setIsLoading] = useState(false);
  const fundMembers = useGetter((state) => state.admin.fundMembers);
  const { handleError } = useErrorContext();
  const sendTx = useCosmosTxSender();

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

      const adminContract = new CW3(wallet, cw3);
      const proposalTitle = getValues("title");
      const proposalDescription = getValues("description");

      const proposalMsg = adminContract.createProposalMsg(
        proposalTitle,
        proposalDescription,
        [embeddedExecuteMsg],
        JSON.stringify(fundUpdateMembersMeta)
      );

      await sendTx({
        msgs: [proposalMsg],
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
