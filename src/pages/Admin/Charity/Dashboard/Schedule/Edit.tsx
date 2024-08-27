import Modal from "components/Modal";
import { useState } from "react";
import type { Allocation } from "types/aws";
import { AllocationSlider } from "./AllocationSlider";

export function Edit(props: Allocation) {
  const [alloc, setAlloc] = useState<Allocation>(props);
  return (
    <Modal className="fixed-center z-10 grid text-navy-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6">
      <h4 className="mb-6">Edit allocation</h4>
      <AllocationSlider value={alloc} onChange={(v) => setAlloc(v)} />
      <button
        type="button"
        className="btn btn-blue px-4 py-2 text-sm uppercase mt-10 rounded-full"
      >
        save
      </button>
    </Modal>
  );
}
