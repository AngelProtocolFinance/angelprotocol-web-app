import { Dialog } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import { LoadingStatus } from "components/Status";
import TokenField from "components/TokenField";
import { TStrategy } from "../strats";
import AccountOptions from "./AccountOptions";
import LockDuration from "./LockDuration";
import useSubmit from "./useSubmit";

export default function Form({ balances }: TStrategy) {
  const { getValues } = useFormContext<FV>();
  const { isSending } = useSubmit("13123", "liquid");
  const { closeModal } = useModalContext();
  return (
    <Dialog.Panel
      onSubmit={() => alert("show summary")}
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
      <AccountOptions balances={balances} classes="mx-8 mb-6" />
      <LockDuration classes="mx-8" />
      <TokenField<FV, "token">
        name="token"
        tokens={getValues("tokens")}
        label="Enter the amount to invest:"
        scale={[10, 20, 50, 100, 250]}
        classes={{
          container: "px-8 mt-6",
          label: "font-heading text-base mb-2",
        }}
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
