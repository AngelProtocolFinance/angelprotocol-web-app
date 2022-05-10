import { useCallback } from "react";
import { Charity } from "@types-server/aws";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { setFormLoading, setStage } from "slices/transaction/transactionSlice";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
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
            setStage({ step: "error", message: "Wallet is not connected" })
          );
          return;
        }

        dispatch(setFormLoading(true));

        const msg = createEndowmentCreationMsg(charity, wallet);

        dispatch(sendTerraTx({ wallet, msgs: [msg] }));
      } catch (err) {
        console.log(processEstimateError(err));
        dispatch(setStage({ step: "error", message: FORM_ERROR }));
        dispatch(setFormLoading(false));
      } finally {
        showModal(TransactionPrompt, {});
      }
    },
    [wallet, dispatch, showModal]
  );

  return { submit, isSubmitting: form_loading };
}
