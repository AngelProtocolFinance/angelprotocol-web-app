import { useCallback } from "react";
import { Charity } from "types/server/aws";
import { FORM_ERROR } from "pages/Registration/constants";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { setFormLoading, setStage } from "slices/transaction/transactionSlice";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import Registrar from "contracts/Registrar";
import processEstimateError from "helpers/processEstimateError";
import useTransactionResultHandler from "./useTransactionResultHandler";

export default function useSubmit() {
  const { providerId, walletAddr, displayCoin } = useGetWallet();
  const { form_loading } = useGetter((state) => state.transaction);
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  // this will submit the endowment contract to AWS
  // and set 'form_loading' to 'false'
  useTransactionResultHandler();

  const submit = useCallback(
    async (charity: Charity) => {
      try {
        if (!providerId) {
          dispatch(
            setStage({ step: "error", message: "Wallet is not connected" })
          );
          return;
        }

        dispatch(setFormLoading(true));

        const contract = new Registrar(walletAddr);
        const msg = contract.createEndowmentCreationMsg(charity);

        dispatch(sendTerraTx({ msgs: [msg], feeBalance: displayCoin.balance }));
      } catch (err) {
        console.log(processEstimateError(err));
        dispatch(setStage({ step: "error", message: FORM_ERROR }));
        dispatch(setFormLoading(false));
      } finally {
        showModal(TransactionPrompt, {});
      }
    },
    [dispatch, showModal]
  );

  return { submit, isSubmitting: form_loading };
}
