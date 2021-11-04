import { Values } from "components/Donater/types";
import { denoms } from "constants/currency";
import { useFormContext } from "react-hook-form";
import useEthSender from "../Donater/useEthSender";
import useTerraSender from "../Donater/useTerraSender";

type Senders = { [index: string]: (data: Values) => Promise<void> };
export default function useSubmit() {
  const { watch, handleSubmit, formState } = useFormContext<Values>();
  const currency = watch("currency");
  const terraSender = useTerraSender();
  const ethSender = useEthSender();

  const senders: Senders = {
    [denoms.uusd]: terraSender,
    [denoms.ether]: ethSender,
  };
  return {
    submitHandler: handleSubmit(senders[currency]),
    isSubmitting: formState.isSubmitting,
  };
}
