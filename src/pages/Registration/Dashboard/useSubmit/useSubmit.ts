import { useCallback } from "react";
import { Charity } from "types/server/aws";
import { FORM_ERROR } from "pages/Registration/constants";
import { useModalContext } from "contexts/ModalContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { setFormLoading, setStage } from "slices/transaction/transactionSlice";
import useWalletContext from "hooks/useWalletContext";
import useTransactionResultHandler from "./useTransactionResultHandler";

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
        console.log(charity);
        alert("submit terra tx to registrar");
      } catch (err) {
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
