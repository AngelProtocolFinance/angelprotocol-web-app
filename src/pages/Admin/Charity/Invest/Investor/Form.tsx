import { Dialog } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { useModalContext } from "contexts/ModalContext";
import TokenField from "components/TokenField";

export default function Form() {
  const { getValues } = useFormContext<FV>();
  const { closeModal } = useModalContext();
  return (
    <Dialog.Panel
      as="form"
      className="max-w-[37.5rem] w-full fixed-center z-20 bg-white dark:bg-blue-d6 border border-prim rounded"
    >
      <TokenField<FV, "token">
        name="token"
        tokens={getValues("tokens")}
        label="Enter the amount to invest:"
        scale={[10, 20, 50, 100, 250]}
        classes={{ container: "px-8 pt-8" }}
      />
      <div className="mt-8 px-8 py-4 gap-x-3 border-t border-prim flex justify-end">
        <button
          onClick={closeModal}
          type="button"
          className="w-32 py-2 btn-outline-filled"
        >
          Cancel
        </button>
        <button type="submit" className="w-32 py-2 btn-orange">
          Continue
        </button>
      </div>
    </Dialog.Panel>
  );
}
