import { useConnectedWallet } from "@terra-money/wallet-provider";
import handleTerraError from "helpers/handleTerraError";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import useTxUpdator from "services/transaction/updators";
import { Step } from "services/transaction/types";
import { chainIDs } from "constants/chainIDs";
import { useSetter } from "store/accessors";
import Admin from "contracts/Admin";

export default function useExecuteProposal(proposal_id: number) {
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { updateTx } = useTxUpdator();

  async function endPoll() {
    try {
      if (!wallet) {
        updateTx({ step: Step.error, message: "Wallet is not connected" });
        return;
      }
      if (proposal_id === 0) {
        updateTx({ step: Step.error, message: "Invalid proposal id" });
        return;
      }
      updateTx({ step: Step.submit, message: "Submitting transaction..." });

      const contract = new Admin(wallet);
      const tx = await contract.createExecProposalTx(proposal_id);
      const response = await wallet.post(tx);

      if (response.success) {
        updateTx({
          step: Step.broadcast,
          message: "Waiting for transaction result",
          chainId: wallet.network.chainID as chainIDs,
          txHash: response.result.txhash,
        });

        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateTx({
            step: Step.success,
            message: "Proposal successfully executed",
            chainId: wallet.network.chainID as chainIDs,
            txHash: response.result.txhash,
          });

          dispatch(
            terra.util.invalidateTags([
              //invalidate whole gov cache
              { type: tags.admin, id: admin.members },
              { type: tags.admin, id: admin.member },
              { type: tags.admin, id: admin.proposal },
            ])
          );
        } else {
          updateTx({
            step: Step.error,
            message: "Transaction failed",
            txHash: txInfo.txhash,
            chainId: wallet.network.chainID as chainIDs,
          });
        }
      }
    } catch (err) {
      handleTerraError(err, updateTx);
    }
  }

  return endPoll;
}
