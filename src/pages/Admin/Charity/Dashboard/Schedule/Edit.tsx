import Modal from "components/Modal";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { useState } from "react";
import { useEditEndowmentMutation } from "services/aws/aws";
import type { Allocation } from "types/aws";
import { AllocationOptions } from "./AllocationOptions";
import { AllocationSlider } from "./AllocationSlider";

export function Edit(props: Allocation & { id: number; amount: number }) {
  const { closeModal } = useModalContext();
  const [editEndow, { isLoading }] = useEditEndowmentMutation();
  const { handleError } = useErrorContext();
  const [alloc, setAlloc] = useState<Allocation>(props);

  return (
    <Modal className="fixed-center z-10 grid gap-y-4 text-navy-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6">
      <h4>Choose allocation</h4>

      <AllocationOptions value={alloc} onChange={(v) => setAlloc(v)} />
      <AllocationSlider
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
