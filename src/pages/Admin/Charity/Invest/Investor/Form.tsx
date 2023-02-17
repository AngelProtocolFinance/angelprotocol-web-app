import { Dialog } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { Vault } from "services/types";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import { LoadingStatus } from "components/Status";
import TokenField from "components/TokenField";
import useSubmit from "./useSubmit";

export default function Form({ acct_type = "liquid", address }: Vault) {
  const { getValues, handleSubmit } = useFormContext<FV>();
  const { submit, isSending } = useSubmit(address, acct_type);
  const { closeModal } = useModalContext();
  return (
    <Dialog.Panel
      onSubmit={handleSubmit(submit)}
      as="form"
      className="max-w-[37.5rem] w-[95vw] sm:w-full fixed-center z-20 bg-white dark:bg-blue-d6 border border-prim rounded"
    >
      <div className="relative border-b border-prim py-5 text-center">
        <span className="font-bold font-heading text-lg">Invest</span>
        <button
          onClick={closeModal}
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 border border-prim rounded p-2"
        >
          <Icon type="Close" size={26.5} />
        </button>
      </div>
      <TokenField<FV, "token">
        name="token"
        tokens={getValues("tokens")}
        label="Enter the amount to invest:"
        scale={[10, 20, 50, 100, 250]}
        classes={{ container: "px-8 pt-8" }}
      />
      <div className="mt-8 px-8 py-4 gap-x-3 border-t border-prim flex justify-end">
        <button
          disabled={isSending}
          onClick={closeModal}
          type="button"
          className="text-sm min-w-[8rem] py-2 btn-outline-filled"
        >
          Cancel
        </button>
        <button
          disabled={isSending}
          type="submit"
          className="text-sm min-w-[8rem] py-2 btn-orange"
        >
          {isSending ? <LoadingStatus>Processing...</LoadingStatus> : "Invest"}
        </button>
      </div>
    </Dialog.Panel>
  );
}
