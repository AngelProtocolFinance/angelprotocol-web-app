import { useCallback, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { DonateValues } from "components/Transactors/Donater/types";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { sendEthDonation } from "services/transaction/transactors/sendEthDonation";
import { sendTerraDonation } from "services/transaction/transactors/sendTerraDonation";
import { resetFee } from "services/transaction/transactionSlice";
import { denoms } from "constants/currency";
import { useSetter } from "store/accessors";
import useEstimator from "../useEstimator";

type Senders = { [index: string]: (data: DonateValues) => any };
export default function useDonate() {
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();
  const dispatch = useSetter();
  const { watch, handleSubmit, setValue } = useFormContext<DonateValues>();
  const { terraTx, ethTx } = useEstimator();

  const terraSender = useCallback(
    (data: DonateValues) => {
      dispatch(sendTerraDonation({ tx: terraTx!, wallet, donateValues: data }));
      showModal(TransactionPrompt, {});
    },

    //eslint-disable-next-line
    [terraTx, wallet]
  );

  const ethSender = useCallback(
    (data: DonateValues) => {
      dispatch(sendEthDonation({ tx: ethTx!, donateValues: data }));
      showModal(TransactionPrompt, {});
    },
    //eslint-disable-next-line
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
      dispatch(resetFee());
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
  };
}
