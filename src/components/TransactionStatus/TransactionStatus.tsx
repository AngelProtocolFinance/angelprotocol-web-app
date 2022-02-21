import { VscLoading, VscCheck, VscChromeClose } from "react-icons/vsc";
import { useGetter } from "store/accessors";
import { Step } from "services/transaction/types";
import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import { useSetModal } from "components/Modal/Modal";

export default function TransactionStatus() {
  const { stage } = useGetter((state) => state.transaction);
  const { showModal } = useSetModal();

  if (stage.step === Step.form) return null;
  const pending = stage.step === Step.broadcast || stage.step === Step.submit;
  const error = stage.step === Step.error;
  const success = stage.step === Step.success || stage.step === Step.receipt;

  const openModal = () => {
    showModal<any>(TransactionSuite, { inModal: true, Context: () => {} });
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="w-full px-3 h-full border border-opacity-40 hover:bg-white hover:bg-opacity-10 rounded-md"
      >
        {error ? (
          <VscChromeClose className="mr-1 text-failed-red text-2xl font-bold" />
        ) : success ? (
          <VscCheck className="mr-1 text-bright-green font-bold text-2xl" />
        ) : pending ? (
          <VscLoading className="animate-spin mr-1 text-white" />
        ) : null}
      </button>
    </div>
  );
}
