import { useCallback, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import { useModalContext } from "contexts/ModalContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { resetFee } from "slices/transaction/transactionSlice";
import { sendEthDonation } from "slices/transaction/transactors/sendEthDonation";
import { denoms } from "constants/currency";
import useEstimator from "../useEstimator";

export default function useDonate() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);

  const { watch, handleSubmit, setValue, getValues } =
    useFormContext<DonateValues>();
  const { showModal } = useModalContext();
  const dispatch = useSetter();
  const { ethTx } = useEstimator();

  const ethSender = useCallback(
    (data: DonateValues) => {
      dispatch(sendEthDonation({ tx: ethTx!, donateValues: data }));
      showModal(TransactionPrompt, {});
    },
    //eslint-disable-next-line
    [ethTx]
  );
  const denomRef = useRef<string>(denoms.uusd);
  const token = watch("token");
  const denom = token.min_denom;

  //reset amount when changing currency
  useEffect(() => {
    if (denomRef.current !== denom) {
      setValue("amount", "", { shouldValidate: true });
      dispatch(resetFee());
    }
    denomRef.current = denom;
    //eslint-disable-next-line
  }, [denom]);

  return {
    donate: handleSubmit(ethSender),
    isSubmitDisabled: form_error !== null || form_loading,
    isFormLoading: form_loading,
    to: getValues("to"),
  };
}
