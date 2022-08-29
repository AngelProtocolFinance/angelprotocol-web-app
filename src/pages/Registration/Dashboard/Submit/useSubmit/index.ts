import { Submitter } from "../../types";
import { useModalContext } from "contexts/ModalContext";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Registrar from "contracts/Registrar";
import { logEndowmentId } from "./logEndowmentId";

export default function useSubmit() {
  const dispatch = useSetter();
  const { showModal } = useModalContext();

  const submit: Submitter = (wallet, charity) => {
    const contract = new Registrar(wallet);
    const msg = contract.createEndowmentCreationMsg(charity);
    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [msg],
        onSuccess(res) {
          return logEndowmentId({
            res,
            chain: wallet, //wallet is defined at this point
            PK: charity.ContactPerson.PK!, //registration data is complete at this point
          });
        },
      })
    );
    showModal(TransactionPrompt, {});
  };

  return { submit };
}
