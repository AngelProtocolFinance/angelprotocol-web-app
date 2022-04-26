import { useCallback, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues, SupportedDenoms } from "@types-component/donater";
import { resetFee } from "slices/transaction/transactionSlice";
import { sendEthDonation } from "slices/transaction/transactors/sendEthDonation";
import { sendTerraDonation } from "slices/transaction/transactors/sendTerraDonation";
import { useGetter, useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import useWalletContext from "hooks/useWalletContext";
import useEstimator from "../useEstimator";

type Senders = { [key in SupportedDenoms]: (data: DonateValues) => any };
export default function useDonate() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);

  const { watch, handleSubmit, setValue, getValues } =
    useFormContext<DonateValues>();
  const { wallet } = useWalletContext();
  const { showModal } = useSetModal();
  const dispatch = useSetter();
  const { terraTx, ethTx, bnbTx } = useEstimator();

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

  const bnbSender = useCallback(
    (data: DonateValues) => {
      dispatch(sendEthDonation({ tx: bnbTx!, donateValues: data }));
      showModal(TransactionPrompt, {});
    },
    //eslint-disable-next-line
    [bnbTx]
  );

  // const btcSender = useBTCSender();
  // const solSender = useSolSender();
  // const atomSender = useAtomSender();
  const denomRef = useRef<SupportedDenoms>("uusd");
  const currency = watch("currency");

  //reset amount when changing currency
  useEffect(() => {
    if (denomRef.current !== currency) {
      setValue("amount", "", { shouldValidate: true });
      dispatch(resetFee());
    }
    denomRef.current = currency;
    //eslint-disable-next-line
  }, [currency]);

  const senders: Senders = {
    uusd: terraSender,
    uluna: terraSender,
    ether: ethSender,
    bnb: bnbSender,
  };

  return {
    donate: handleSubmit(senders[currency]),
    isSubmitDisabled: form_error !== null || form_loading,
    isFormLoading: form_loading,
    to: getValues("to"),
  };
}
