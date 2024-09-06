import { Field, Label, Switch } from "@headlessui/react";
import Modal from "components/Modal";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { useState } from "react";
import { useEditEndowmentMutation } from "services/aws/aws";
import type { Allocation } from "types/aws";
import { AllocationOptions } from "./AllocationOptions";
import { AllocationSlider } from "./AllocationSlider";
import { allocationOptions, toKey } from "./common";

export function Edit({
  id,
  amount,
  ...props
}: Allocation & { id: number; amount: number }) {
  const { closeModal } = useModalContext();
  const [editEndow, { isLoading }] = useEditEndowmentMutation();
  const { handleError } = useErrorContext();
  const [alloc, setAlloc] = useState<Allocation>(props);
  const [isCustom, setIsCustom] = useState(
    allocationOptions.every((opt) => opt.value !== toKey(props))
  );

  return (
    <Modal className="fixed-center z-10 grid gap-y-4 text-navy-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6">
      <h4>Choose allocation</h4>

      <AllocationOptions
        value={alloc}
        onChange={(v) => {
          setIsCustom(false);
          setAlloc(v);
        }}
      />

      <Field className="flex items-center gap-x-2 mt-4">
        <Switch
          checked={isCustom}
          onChange={setIsCustom}
          className="group relative flex h-6 w-10 cursor-pointer rounded-full bg-gray-l4 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-blue-d1 shadow-inner"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-4"
          />
        </Switch>
        <Label>Set custom allocation</Label>
      </Field>
      {isCustom && (
        <AllocationSlider
          disabled={isLoading}
          value={alloc}
          onChange={(v) => setAlloc(v)}
        />
      )}

      <button
        disabled={isLoading}
        type="button"
        className="btn btn-blue px-4 py-2 text-sm uppercase mt-4 rounded-full"
        onClick={async () => {
          try {
            await editEndow({ id, allocation: alloc }).unwrap();
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
