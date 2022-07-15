import { invalidateJunoTags } from "services/juno";
import { junoTags, multicallTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Gov from "contracts/Gov";

export default function useEndPoll(pollId: number) {
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();
  const dispatch = useSetter();

  function endPoll() {
    if (pollId === 0) {
      showModal(Popup, { message: "Poll is invalid" });
      return;
    }

    const contract = new Gov(wallet);
    const msg = contract.createEndPollMsg(pollId);

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [msg],
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.gov },
            { type: junoTags.multicall, id: multicallTags.junoBalances },
          ]),
        ],
      })
    );
  }

  return { endPoll };
}
