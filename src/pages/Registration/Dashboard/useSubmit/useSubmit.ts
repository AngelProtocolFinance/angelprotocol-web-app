import { useCallback } from "react";
import { Charity } from "types/server/aws";
import { FORM_ERROR } from "pages/Registration/constants";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { setFormLoading, setStage } from "slices/transaction/transactionSlice";
import { sendCosmosTx } from "slices/transaction/transactors/sendCosmosTx";
import Registrar from "contracts/Registrar";
import processEstimateError from "helpers/processEstimateError";
import useTransactionResultHandler from "./useTransactionResultHandler";

export default function useSubmit() {
  const { wallet } = useGetWallet();
  const { form_loading } = useGetter((state) => state.transaction);
  const dispatch = useSetter();
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

        const contract = new Registrar(wallet.address);
        const msg = contract.createEndowmentCreationMsg(charity);

        dispatch(
          sendCosmosTx({
            wallet,
            msgs: [msg],
          })
        );
      } catch (err) {
        console.log(processEstimateError(err));
        dispatch(setStage({ step: "error", message: FORM_ERROR }));
        dispatch(setFormLoading(false));
      } finally {
        showModal(TransactionPrompt, {});
      }
    },
    [dispatch, showModal, wallet]
  );

  return { submit, isSubmitting: form_loading };
}
