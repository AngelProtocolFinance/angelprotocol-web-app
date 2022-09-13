import { useCallback } from "react";
import { Charity } from "types/aws";
import { GENERIC_ERROR_MESSAGE } from "pages/Registration/constants";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { setFormLoading, setStage } from "slices/transaction/transactionSlice";
import { sendCosmosTx } from "slices/transaction/transactors";
import CW3Review from "contracts/CW3/CW3Review";
import { logger, processEstimateError } from "helpers";
import { logProposalId } from "./logProposalId";

export default function useSubmit() {
  const { wallet } = useGetWallet();
  const { form_loading } = useGetter((state) => state.transaction);
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  const submit = useCallback(
    async (charity: Charity) => {
      try {
        const contract = new CW3Review(wallet);
        const msg = contract.createProposeApplicationMsg(charity);
        dispatch(
          sendCosmosTx({
            wallet,
            msgs: [msg],
            onSuccess(res) {
              return logProposalId({
                res,
                wallet: wallet!, //wallet is defined at this point
                PK: charity.ContactPerson.PK!, //registration data is complete at this point
              });
            },
          })
        );
      } catch (err) {
        logger.error(processEstimateError(err));
        dispatch(setStage({ step: "error", message: GENERIC_ERROR_MESSAGE }));
        dispatch(setFormLoading(false));
      } finally {
        showModal(TransactionPrompt, {});
      }
    },
    [dispatch, showModal, wallet]
  );

  return { submit, isSubmitting: form_loading };
}
