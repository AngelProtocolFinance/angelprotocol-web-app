import { useConnectedWallet } from "@terra-money/use-wallet";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useCallback } from "react";
import { endPoll } from "services/transaction/transactors/endPoll";
import { useSetter } from "store/accessors";

export type Props = { poll_id: number };
export default function EnderForm(props: Props) {
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();

  const _endPoll = useCallback(() => {
    dispatch(endPoll({ wallet, pollId: props.poll_id }));
    showModal(TransactionPrompt, {});
    //eslint-disable-next-line
  }, [wallet, props.poll_id]);

  return (
    <div className="bg-white-grey grid justify-items-center p-4 rounded-md w-full">
      <p className="text-angel-grey">are you sure you want to end this poll?</p>
      <button
        type="button"
        className="rounded-md bg-angel-orange text-white hover:text-angel-grey font-heading px-4 py-1 text-xs uppercase font-bold mt-4"
        onClick={_endPoll}
      >
        confirm
      </button>
    </div>
  );
}
