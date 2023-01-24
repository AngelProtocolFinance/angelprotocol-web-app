import { Dialog } from "@headlessui/react";
import { VoteValues as V } from "./types";
import Reason from "./Reason";
import VoteOption from "./VoteOption";
import useVote from "./useVote";

export default function Form() {
  const { vote, isSubmitDisabled, isSending } = useVote();
  return (
    <Dialog.Panel
      as="form"
      onSubmit={vote}
      className="w-full max-w-md fixed-center z-20 font-work text-gray-d2 dark:text-white bg-white dark:bg-blue-d6 border border-prim -mt-4 grid p-4 pt-4 rounded"
      autoComplete="off"
    >
      <div className="grid grid-cols-2 gap-4 mb-6 mt-2">
        <VoteOption<V> label="yes" vote="yes" />
        <VoteOption<V> label="no" vote="no" />
      </div>
      <Reason />

      <button
        disabled={isSubmitDisabled}
        className="btn btn-orange rounded px-4 py-2"
        type="submit"
      >
        {isSending ? "Submitting.." : "Proceed"}
      </button>
    </Dialog.Panel>
  );
}
