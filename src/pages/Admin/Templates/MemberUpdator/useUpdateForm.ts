import { SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMembers } from "services/terra/admin/queriers";
import { Values, MemberCopy, MemberUpdateFn, Diffs } from "./types";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Step } from "services/transaction/types";
import Admin from "contracts/Admin";
import { Member } from "services/terra/admin/types";
import handleTerraError from "helpers/handleTerraError";
import useTxUpdator from "services/transaction/updators";
import { chainIDs } from "constants/chainIDs";

export default function useMemberUpdator() {
  const wallet = useConnectedWallet();
  const { updateTx } = useTxUpdator();
  const members = useMembers();
  const [membersCopy, setMemberCopy] = useState<MemberCopy[]>([]);

  useEffect(() => {
    if (members.length > 0) {
      setMemberCopy(() =>
        members.map((member) => ({
          ...member,
          is_deleted: false,
          is_added: false,
        }))
      );
    }
  }, [members]);

  const remove_member: MemberUpdateFn = (actual) => () => {
    const modified = membersCopy.map((stored) => ({
      ...stored,
      is_deleted: actual.addr === stored.addr ? true : stored.is_deleted,
    }));
    setMemberCopy(modified);
  };

  const undo_remove: MemberUpdateFn = (actual) => () => {
    const modified = membersCopy.map((stored) => ({
      ...stored,
      is_deleted: actual.addr === stored.addr ? false : stored.is_deleted,
    }));
    setMemberCopy(modified);
  };

  const add_member: SubmitHandler<Values> = (data) => {
    const new_member: MemberCopy = {
      addr: data.addr,
      weight: +data.weight,
      is_added: true,
      is_deleted: false,
    };
    const existing_member = membersCopy.find(
      (member) => member.addr === new_member.addr
    );
    if (existing_member) {
      alert("existing");
    } else {
      const modified = [...membersCopy, new_member];
      setMemberCopy(modified);
    }
  };

  const undo_add: MemberUpdateFn = (actual) => () => {
    const modified = membersCopy.filter(
      (stored) => actual.addr !== stored.addr
    );
    setMemberCopy(modified);
  };

  function get_updator(member: MemberCopy) {
    if (member.is_added) {
      return undo_add(member);
    } else if (member.is_deleted) {
      return undo_remove(member);
    } else {
      return remove_member(member);
    }
  }

  async function submit_proposal() {
    try {
      if (!wallet) {
        updateTx({ step: Step.error, message: "Wallet is not connected" });
        return;
      }
      const chainId = wallet.network.chainID as chainIDs;

      //check if there are changes
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

  return { membersCopy, get_updator, add_member, submit_proposal };
}
