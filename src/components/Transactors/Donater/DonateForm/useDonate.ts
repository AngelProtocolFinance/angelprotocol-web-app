import { DonateValues } from "components/Transactors/Donater/types";
import { denoms } from "constants/currency";
import { useFormContext } from "react-hook-form";
import { useCallback, useEffect, useRef } from "react";
import useEstimator from "../useEstimator";
import useEthSender from "../useEthSender";
import { useSetter } from "store/accessors";
import { sendTerraDonation } from "services/transaction/sendTerraDonation";
import { useConnectedWallet } from "@terra-money/use-wallet";
import { sendEthDonation } from "services/transaction/sendEthDonation";

type Senders = { [index: string]: (data: DonateValues) => any };
export default function useDonate() {
  const wallet = useConnectedWallet();
  const dispatch = useSetter();
  const { watch, handleSubmit, formState, setValue } =
    useFormContext<DonateValues>();
  const { terraTx, ethTx } = useEstimator();

  const terraSender = useCallback(
    (data: DonateValues) => {
      dispatch(sendTerraDonation({ tx: terraTx!, wallet, donateValues: data }));
    },
    [terraTx, wallet]
  );

  const ethSender = useCallback(
    (data: DonateValues) => {
      dispatch(sendEthDonation({ tx: ethTx!, donateValues: data }));
    },
    [ethTx]
  );

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
