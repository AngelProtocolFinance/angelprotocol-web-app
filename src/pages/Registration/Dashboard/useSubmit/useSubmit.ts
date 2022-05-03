import { useCallback } from "react";
import { Charity } from "services/aws/types";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import {
  setFormLoading,
  setStage,
} from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import { useModalContext } from "components/ModalContext/ModalContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import useWalletContext from "hooks/useWalletContext";
import processEstimateError from "helpers/processEstimateError";
import createEndowmentCreationMsg from "./createEndowmentCreationMsg";
import useTransactionResultHandler from "./useTransactionResultHandler";

const FORM_ERROR =
  "An error occured. Please try again and if the error persists after two failed attempts, please contact support@angelprotocol.io";

export default function useSubmit() {
  const { form_loading } = useGetter((state) => state.transaction);
  const dispatch = useSetter();

  const { wallet } = useWalletContext();
  const { showModal } = useModalContext();

  // this will submit the endowment contract to AWS
  // and set 'form_loading' to 'false'
  useTransactionResultHandler();

  const submit = useCallback(
    async (charity: Charity) => {
      try {
        if (!wallet) {
          dispatch(
            setStage({ step: Step.error, message: "Wallet is not connected" })
          );
          return;
        }

        dispatch(setFormLoading(true));

        const msg = createEndowmentCreationMsg(charity, wallet);

        dispatch(sendTerraTx({ wallet, msgs: [msg] }));
      } catch (err) {
        console.log(processEstimateError(err));
        dispatch(setStage({ step: Step.error, message: FORM_ERROR }));
        dispatch(setFormLoading(false));
      } finally {
        showModal(TransactionPrompt, {});
      }
    },
    [wallet, dispatch, showModal]
  );

  return { submit, isSubmitting: form_loading };
}
