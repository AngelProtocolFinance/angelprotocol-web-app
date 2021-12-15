import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useSetModal } from "components/Nodal/Nodal";
import ErrPop, { Props as ErrProps } from "components/Popup/ErrPop";
import Waiter, { Props as WaitProps } from "components/Popup/Waiter";
import Result, { Props as ResultProps } from "components/Popup/Result";
import Halo from "contracts/Halo";
import displayTerraError from "helpers/displayTerraError";
import { useSetter } from "store/accessors";
import { terra } from "services/terra/terra";
import { tags, user } from "services/terra/tags";

export default function usePollAction(poll_id?: string) {
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();

  async function end_poll() {
    try {
      if (!wallet) {
        showModal<ErrProps>(ErrPop, { desc: "Wallet is disconnected" });
        return;
      }

      if (!poll_id) {
        showModal<ErrProps>(ErrPop, { desc: "Can't modify this poll" });
        return;
      }

      showModal<WaitProps>(Waiter, { desc: "Submitting transaction" });

      const contract = new Halo(wallet);
      const tx = await contract.createEndPollTx(poll_id);

      const response = await wallet.post(tx);

      if (response.success) {
        showModal<WaitProps>(Waiter, {
          desc: "Waiting for transaction result",
          url: `https://finder.terra.money/${wallet.network.chainID}/tx/${response.result.txhash}`,
        });

        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          showModal<ResultProps>(Result, {
            desc: "Poll sucessfully ended",
            url: `https://finder.terra.money/${wallet.network.chainID}/tx/${response.result.txhash}`,
          });

          dispatch(
            terra.util.invalidateTags([
              //invalidate whole gov cache
              { type: tags.gov },
              { type: tags.user, id: user.halo_balance },
            ])
          );
        } else {
          showModal<ErrProps>(ErrPop, {
            desc: "Transaction failed",
            url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
          });
        }
      }
    } catch (err) {
      console.error(err);
      displayTerraError(err, showModal);
    }
  }

  return end_poll;
}
