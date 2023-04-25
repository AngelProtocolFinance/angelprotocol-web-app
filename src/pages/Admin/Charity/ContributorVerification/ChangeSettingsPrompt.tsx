import { PropsWithChildren } from "react";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon/Icon";
import Modal from "components/Modal";

export default function ChangeSettingsPrompt({
  children,
}: PropsWithChildren<{}>) {
  const { closeModal } = useModalContext();

  return (
    <Modal className="fixed-center z-10 grid text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-xl rounded overflow-hidden">
      <div className="relative">
        <h3 className="text-xl text-center border-b bg-orange-l6 dark:bg-blue-d7 border-prim p-5">
          Change settings
        </h3>
        <button
          onClick={closeModal}
          className="border border-prim p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 disabled:text-gray-l3 dark:disabled:text-bluegray-d1 disabled:dark:border-bluegray-d1"
        >
          <Icon type="Close" size={24} />
        </button>
      </div>
      {children}
      <div className="flex justify-end gap-3 p-3 sm:px-8 sm:py-4 empty:h-12 w-full text-center bg-orange-l6 dark:bg-blue-d7 border-t border-prim">
        <button
          type="button"
          className="inline-block btn-outline-filled w-32 h-12 text-sm"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="button"
          className="inline-block btn-orange w-32 h-12 text-sm"
          onClick={closeModal}
        >
          Change
        </button>
      </div>
    </Modal>
  );
}
