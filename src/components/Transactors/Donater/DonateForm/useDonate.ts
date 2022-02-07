import { Values } from "components/Transactors/Donater/types";
import { denoms } from "constants/currency";
import { useFormContext } from "react-hook-form";
// import useEthSender from "../Donater/useEthSender";
import useTerraSender from "../useTerraSender";
// import useBTCSender from "../Donater/useBTCSender";
// import useSolSender from "components/Donater/useSolSender";
// import useAtomSender from "components/Donater/useAtomSender";
import { useEffect, useRef } from "react";
import useEstimator from "../useEstimator";
import useEthSender from "../useEthSender";

type Senders = { [index: string]: (data: Values) => Promise<void> };
export default function useDonate() {
  const { watch, handleSubmit, formState, setValue } = useFormContext<Values>();
  const { terraTx, ethTx } = useEstimator();
  const terraSender = useTerraSender(terraTx!);
  const ethSender = useEthSender(ethTx!);
  // const btcSender = useBTCSender();
  // const solSender = useSolSender();
  // const atomSender = useAtomSender();
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
    [denoms.uluna]: terraSender,
    [denoms.ether]: ethSender,
    // [denoms.btc]: btcSender,
    // [denoms.sol]: solSender,
    // [denoms.uatom]: atomSender,
  };

  return {
    donate: handleSubmit(senders[currency]),
    isSubmitting: formState.isSubmitting,
  };
}
