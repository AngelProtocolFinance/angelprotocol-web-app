import { useModalContext } from "contexts/ModalContext";
import APLogo from "components/APLogo";
import Icon from "components/Icon";
import Panel from "components/Panel";
import { adminMobileNavId } from "../constants";
import Links from "./Links";

export default function Menu() {
  const { closeModal } = useModalContext();
  return (
    <Panel
      as="div"
      className="fixed top-0 inset-x-0 z-10 bg-blue dark:bg-blue-d5 flex flex-col gap-4 shadow-lg pb-8"
    >
      <div className="flex justify-between items-center w-full py-4 padded-container border-b border-gray-l2">
        <APLogo className="w-32" />
        <button
          onClick={closeModal}
          className="flex items-center text-white justify-center"
        >
          <Icon type="Close" size={32} />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 padded-container">
        <Links />
        <div
          className="empty:hidden w-full border-t pt-4 sm:pt-0 sm:border-l sm:border-t-0 sm:pl-4 border-white/20"
          id={adminMobileNavId}
        />
      </div>
    </Panel>
  );
}
