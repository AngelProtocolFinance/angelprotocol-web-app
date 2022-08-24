import { useCallback } from "react";
import { Charity } from "types/server/aws";
import { FORM_ERROR } from "pages/Registration/constants";
import { useChaimQuery } from "services/apes";
import { VerifiedChain } from "contexts/ChainGuard";
import { useModalContext } from "contexts/ModalContext";
import { useWalletContext } from "contexts/WalletContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { setFormLoading, setStage } from "slices/transaction/transactionSlice";
import { sendCosmosTx } from "slices/transaction/transactors";
import Registrar from "contracts/Registrar";
import { logger, processEstimateError } from "helpers";
import { logEndowmentId } from "./logEndowmentId";

export default function useSubmit() {
  const { form_loading } = useGetter((state) => state.transaction);
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  const { wallet } = useWalletContext();
  const { data: chain } = useChaimQuery(wallet!, { skip: !wallet });

  const submit = useCallback(
    async (charity: Charity) => {
      try {
        if (!wallet) {
          showModal(Popup, { message: "wallet is disconnected" });
          return;
        }

        if (!chain) {
          showModal(Popup, { message: "Network unsupported" });
          return;
        }

        const verifiedChain: VerifiedChain = { ...chain, wallet };
        const contract = new Registrar(verifiedChain);
        const msg = contract.createEndowmentCreationMsg(charity);
        dispatch(
          sendCosmosTx({
            chain: verifiedChain,
            msgs: [msg],
            onSuccess(res) {
              return logEndowmentId({
                res,
                chain: verifiedChain, //wallet is defined at this point
                PK: charity.ContactPerson.PK!, //registration data is complete at this point
              });
            },
          })
        );
      } catch (err) {
        logger.error(processEstimateError(err));
        dispatch(setStage({ step: "error", message: FORM_ERROR }));
        dispatch(setFormLoading(false));
      } finally {
        showModal(TransactionPrompt, {});
      }
    },
    [dispatch, showModal, chain, wallet]
  );

  return { submit, isSubmitting: form_loading };
}
