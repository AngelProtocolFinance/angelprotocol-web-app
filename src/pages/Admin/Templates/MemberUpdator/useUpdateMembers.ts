import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Step } from "services/transaction/types";
import { Member } from "services/terra/admin/types";
import useTxUpdator from "services/transaction/updators";
import handleTerraError from "helpers/handleTerraError";
import { chainIDs } from "constants/chainIDs";
import Admin from "contracts/Admin";
import { useGetter } from "store/accessors";
import { useFormContext } from "react-hook-form";
import { MemberUpdatorValues } from "./memberUpdatorSchema";

export default function useUpdateMembers() {
  const { trigger } = useFormContext<MemberUpdatorValues>();
  const wallet = useConnectedWallet();
  const { updateTx } = useTxUpdator();
  const membersCopy = useGetter((state) => state.admin.members);

  async function updateMembers() {
    try {
      if (!wallet) {
        updateTx({ step: Step.error, message: "Wallet is not connected" });
        return;
      }

      const isValid = await trigger(["description", "title"], {
        shouldFocus: true,
      });
      if (!isValid) return;

      const chainId = wallet.network.chainID as chainIDs;
      //check if there are changes
      type Diffs = [Member[], string[]];
      const [to_add, to_remove]: Diffs = membersCopy.reduce(
        ([to_add, to_remove]: Diffs, memberCopy) => {
          const member: Member = {
            addr: memberCopy.addr,
            weight: memberCopy.weight,
          };
          if (memberCopy.is_added) {
            to_add.push(member);
          }
          if (memberCopy.is_deleted) {
            to_remove.push(member.addr);
          }
          return [to_add, to_remove];
        },
        [[], []]
      );

      if (to_remove.length <= 0 && to_add.length <= 0) {
        updateTx({ step: Step.error, message: "No changes we're made" });
        return;
      }

      updateTx({ step: Step.submit, message: "Submitting proposal" });

      const contract = new Admin(wallet);
      const execute_msg = contract.createUpdateMembersMsg(to_add, to_remove);
      const tx = await contract.createProposalTx(
        "update member",
        "to update member",
        [execute_msg]
      );

      const response = await wallet.post(tx);

      updateTx({
        step: Step.broadcast,
        message: "Waiting for transaction result",
        chainId,
        txHash: response.result.txhash,
      });

      if (response.success) {
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateTx({
            step: Step.success,
            message: "Successfully submitted proposal",
            chainId,
            txHash: response.result.txhash,
          });
        } else {
          updateTx({
            step: Step.success,
            message: "Failed to create proposal",
            chainId,
            txHash: response.result.txhash,
          });
        }
      }
    } catch (err) {
      handleTerraError(err, updateTx);
    }
  }

  return { updateMembers };
}
