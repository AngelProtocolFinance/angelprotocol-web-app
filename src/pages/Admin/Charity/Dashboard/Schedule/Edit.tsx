import Modal from "components/Modal";
import { Info } from "components/Status";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { humanize } from "helpers";
import { useState } from "react";
import { useEditEndowmentMutation } from "services/aws/aws";
import type { Allocation } from "types/aws";
import { AllocationSlider } from "./AllocationSlider";
import { MIN_PROCESSING_AMOUNT, unprocessed } from "./common";

export function Edit(props: Allocation & { id: number; amount: number }) {
  const { closeModal } = useModalContext();
  const [editEndow, { isLoading }] = useEditEndowmentMutation();
  const { handleError } = useErrorContext();
  const [alloc, setAlloc] = useState<Allocation>(props);

  const leftover = unprocessed(alloc, props.amount);

  return (
    <Modal className="fixed-center z-10 grid gap-y-4 text-navy-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6">
      <div className="flex justify-between border-b border-gray-l4 pb-2">
        <h4>Edit allocation</h4>
        <p>$ {humanize(props.amount)}</p>
      </div>

      {leftover > 0 && (
        <Info classes="!text-amber-d1">
          We process donations monthly, with a minimum balance requirement of $
          {MIN_PROCESSING_AMOUNT} per bucket. If your balance in any bucket is
          below ${MIN_PROCESSING_AMOUNT}, it will be carried over to the next
          month until it exceeds $50
        </Info>
      )}
      <AllocationSlider
        amount={props.amount}
        disabled={isLoading}
        value={alloc}
        onChange={(v) => setAlloc(v)}
      />
      <button
        disabled={isLoading}
        type="button"
        className="btn btn-blue px-4 py-2 text-sm uppercase mt-4 rounded-full"
        onClick={async () => {
          try {
            await editEndow({ id: props.id, allocation: alloc }).unwrap();
            closeModal();
          } catch (err) {
            handleError(err);
          }
        }}
      >
        {isLoading ? "Updating.." : "Save"}
      </button>
    </Modal>
  );
}
