import Modal from "components/Modal";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { humanize } from "helpers";
import { useState } from "react";
import { useEditEndowmentMutation } from "services/aws/aws";
import type { Allocation } from "types/aws";
import { AllocationSlider } from "./AllocationSlider";

export function Edit(props: Allocation & { id: number; amount: number }) {
  const { closeModal } = useModalContext();
  const [editEndow, { isLoading }] = useEditEndowmentMutation();
  const { handleError } = useErrorContext();
  const [alloc, setAlloc] = useState<Allocation>(props);

  return (
    <Modal className="fixed-center z-10 grid text-navy-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6">
      <div className="mb-6 flex justify-between border-b border-gray-l4 pb-2">
        <h4>Edit allocation</h4>
        <p>$ {humanize(props.amount)}</p>
      </div>
      <AllocationSlider
        amount={props.amount}
        disabled={isLoading}
        value={alloc}
        onChange={(v) => setAlloc(v)}
      />
      <button
        disabled={isLoading}
        type="button"
        className="btn btn-blue px-4 py-2 text-sm uppercase mt-10 rounded-full"
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
