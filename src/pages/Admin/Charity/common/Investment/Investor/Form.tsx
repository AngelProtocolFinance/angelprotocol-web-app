import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { Vault } from "services/types";
import TokenField from "components/TokenField";
import TxModal from "../../TxModal";
import useSubmit from "./useSubmit";

export default function Form({ acct_type = "liquid", address }: Vault) {
  const { getValues, handleSubmit } = useFormContext<FV>();
  const { submit, isSending } = useSubmit(address, acct_type);
  return (
    <TxModal
      action="Invest"
      title="Invest"
      isSending={isSending}
      onSubmit={handleSubmit(submit)}
    >
      <TokenField<FV, "token">
        name="token"
        tokens={getValues("tokens")}
        label="Enter the amount to invest:"
        scale={[10, 20, 50, 100, 250]}
        classes={{ container: "px-8 pt-8" }}
      />
    </TxModal>
  );
}
