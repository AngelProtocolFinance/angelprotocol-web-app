import Icon from "components/Icon";
import Modal from "components/Modal";
import Prompt from "components/Prompt";
import { adminRoutes, appRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { useNavigate } from "react-router-dom";
import { useDeleteBankingApplicationMutation } from "services/aws/banking-applications";

type Props = {
  endowID: number;
  message: string;
  uuid: string;
  canProceed: boolean;
};

export default function DeletePrompt({
  message,
  uuid,
  canProceed,
  endowID,
}: Props) {
  const [deletePayoutMethod, { isLoading }] =
    useDeleteBankingApplicationMutation();
  const { handleError } = useErrorContext();
  const { isDismissible, setModalOption, closeModal, showModal } =
    useModalContext();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      setModalOption("isDismissible", false);
      await deletePayoutMethod(uuid).unwrap();

      showModal(Prompt, {
        headline: "Success!",
        children: (
          <p className="my-4 text-lg font-semibold">Payout method deleted</p>
        ),
      });
      navigate(appRoutes.admin + `/${endowID}/${adminRoutes.banking}`);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Modal className="fixed-center z-10 grid content-start justify-items-center text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden">
      <div className="relative w-full">
        <p className="sm:text-xl font-bold text-center border-b bg-orange-l6 dark:bg-blue-d7 border-gray-l4 p-5">
          Delete payout method
        </p>
        {isDismissible && (
          <button
            onClick={closeModal}
            disabled={isLoading}
            className="border border-gray-l4 p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 disabled:text-gray-l3 dark:disabled:text-navy-d3 disabled:dark:border-navy-d3"
          >
            <Icon type="Close" className="text-lg sm:text-2xl" />
          </button>
        )}
      </div>
      <Icon type="ExclamationCircleFill" size={80} className="mt-6 text-red" />

      <div className="p-6 text-center text-gray-d1 dark:text-gray-l3">
        {message}
      </div>

      {canProceed && (
        <div className="p-3 sm:px-8 sm:py-4 flex items-center justify-end gap-4 w-full text-center sm:text-right bg-orange-l6 dark:bg-blue-d7 border-t border-gray-l4">
          <button
            disabled={isLoading}
            type="button"
            className="btn-outline-filled text-sm px-8 py-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type="button"
            onClick={handleConfirm}
            className="btn-orange px-8 py-2 text-sm"
          >
            Proceed
          </button>
        </div>
      )}
    </Modal>
  );
}
