import { Values } from "components/Donater/types";
import { denoms } from "constants/currency";
import { useFormContext } from "react-hook-form";
import useEthSender from "../Donater/useEthSender";
import useTerraSender from "../Donater/useTerraSender";
import useBTCSender from "../Donater/useBTCSender";
import useSolSender from "components/Donater/useSolSender";
import { useEffect, useRef } from "react";

type Senders = { [index: string]: (data: Values) => Promise<void> };
export default function useSubmit() {
  const { watch, handleSubmit, formState, setValue } = useFormContext<Values>();
  const terraSender = useTerraSender();
  const ethSender = useEthSender();
  const btcSender = useBTCSender();
  const solSender = useSolSender();
  const denomRef = useRef<denoms>(denoms.uusd);
  const currency = watch("currency");
  //reset amount when changing currency
  useEffect(() => {
    if (denomRef.current !== currency) {
      setValue("amount", "", { shouldValidate: false });
    }
    denomRef.current = currency;
    //eslint-disable-next-line
  }, [currency]);

  const senders: Senders = {
    [denoms.uusd]: terraSender,
    [denoms.ether]: ethSender,
    [denoms.btc]: btcSender,
    [denoms.sol]: solSender,
  };
  return {
    submitHandler: handleSubmit(senders[currency]),
    isSubmitting: formState.isSubmitting,
  };
}
