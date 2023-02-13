import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { Vault } from "services/types";
import { maskAddress } from "helpers";
import TxModal from "../../TxModal";
import Amount from "./Amount";
import useSubmit from "./useSubmit";

export default function Form({ acct_type = "liquid", address, symbol }: Vault) {
  const { handleSubmit } = useFormContext<FV>();
  const { submit, isSending } = useSubmit(address, acct_type);
  return (
    <TxModal
      title="Redeem your assets"
      action="Redeem"
      isSending={isSending}
      onSubmit={handleSubmit(submit)}
    >
      <div className="mx-8 mt-6 px-6 py-2 rounded border border-prim">
        <p className="px-6 py-3 flex justify-between border-b border-prim">
          <span>Vault</span>
          <span className="font-work font-semibold">
            {maskAddress(address)}
          </span>
        </p>
        <Amount classes="px-6" symbol={symbol} />
      </div>
    </TxModal>
  );
}
