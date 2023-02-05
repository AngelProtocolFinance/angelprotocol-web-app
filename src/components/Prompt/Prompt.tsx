import { Dialog } from "@headlessui/react";
import { Props } from "./types";
import { useModalContext } from "contexts/ModalContext";
import { openMailer } from "components/ErrorBoundary/Mailer";
import Icon from "../Icon";
import LoaderRing from "../LoaderRing";

export default function Prompt(props: Props) {
  const { closeModal, isDismissible } = useModalContext();

  const { type, headline = "", title, children } = props;

  return (
    <Dialog.Panel className="fixed-center z-10 grid text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden">
      <div className="relative">
        <p className="empty:h-16 text-xl font-bold text-center border-b bg-orange-l6 dark:bg-blue-d7 border-prim p-5 font-work">
          {headline}
        </p>
        {isDismissible && (
          <button
            onClick={closeModal}
            className="border border-prim p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 disabled:text-gray-l2 dark:disabled:text-bluegray-d1 disabled:dark:border-bluegray-d1"
          >
            <Icon type="Close" size={24} />
          </button>
        )}
      </div>
      <PromptIcon type={type} classes="mb-6 sm:mb-8 mt-4 sm:mt-12" />
      {title && (
        <h3 className="font-bold text-center text-3xl mb-2 leading-normal px-3 sm:px-8">
          {title}
        </h3>
      )}
      <div className="px-6 pb-4 text-center text-gray-d1 dark:text-gray">
        {children}
      </div>
      <div className="p-3 sm:px-8 sm:py-4 empty:h-12 w-full flex gap-4 sm:justify-end bg-orange-l6 dark:bg-blue-d7 border-t border-prim">
        {props.type === "error" && props.report && (
          <button
            type="button"
            className="btn-outline-filled px-8 py-2 max-sm:w-full min-w-[8rem]"
            onClick={() => openMailer(props.report ?? "")}
          >
            Report
          </button>
        )}
        {isDismissible && (
          <button
            type="button"
            className="btn-orange px-8 py-2 max-sm:w-full min-w-[8rem]"
            onClick={closeModal}
          >
            {type === "success" ? "Done" : "Ok"}
          </button>
        )}
      </div>
    </Dialog.Panel>
  );
}

function PromptIcon({
  type,
  classes = "",
}: Pick<Props, "type"> & { classes?: string }) {
  const common = `justify-self-center ${classes}`;
  switch (type) {
    case "success":
      return (
        <Icon type="CheckCircle" size={92} className={common + " text-green"} />
      );
    case "error":
      return (
        <Icon
          type="ExclamationCircleFill"
          size={80}
          className={common + " text-red"}
        />
      );
    case "loading":
      return <LoaderRing thickness={12} classes={common + " h-24"} />;
    default:
      return null;
  }
}
