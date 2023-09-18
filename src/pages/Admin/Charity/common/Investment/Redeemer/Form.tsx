import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { maskAddress } from "helpers";
import TxModal from "../../TxModal";
import Amount from "./Amount";
import useSubmit from "./useSubmit";

export default function Form({
  acct_type = "liquid" as any,
  address = "12313123123",
  symbol = "USD",
}) {
  const { handleSubmit } = useFormContext<FV>();
  const { submit, isSending } = useSubmit(address, acct_type);
  return (
    <TxModal
      title="Redeem your assets"
      action="Redeem"
      isSending={isSending}
      onSubmit={handleSubmit(submit)}
    >
      <div className="mx-8 mt-6 px-6 py-2 rounded border border-gray-l3 dark:border-bluegray">
        <p className="px-6 py-3 flex justify-between border-b border-gray-l3 dark:border-bluegray">
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
