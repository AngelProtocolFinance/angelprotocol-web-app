import { Dialog } from "@headlessui/react";
import { PropsWithChildren } from "react";
import { useModalContext } from "contexts/ModalContext";
import Icon from "./Icon";
import LoaderRing from "./LoaderRing";

type Props = PropsWithChildren<{
  type: "success" | "error" | "loading";
  headline: string;
  title: string;
}>;

export default function Prompt({ type, headline, title, children }: Props) {
  const { closeModal } = useModalContext();

  return (
    <Dialog.Panel className="fixed-center z-10 grid text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded overflow-hidden">
      <div className="relative">
        <p className="text-xl font-bold text-center border-b bg-orange-l6 dark:bg-blue-d7 border-gray-l2 dark:border-bluegray p-5 font-work">
          {headline}
        </p>
        <button
          onClick={() => closeModal()}
          className="border border-gray-l2 dark:border-bluegray p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2"
        >
          <Icon type="Close" size={24} className="dark:text-white" />
        </button>
      </div>
      <PromptIcon type={type} classes="mb-6 sm:mb-8 mt-4 sm:mt-12" />
      <h3 className="font-bold text-center text-3xl mb-2 leading-normal px-3 sm:px-8">
        {title}
      </h3>
      <div className="px-6 pb-4 text-center text-gray-d1 dark:text-gray">
        {children}
      </div>
      <div className="p-3 sm:px-8 sm:py-4 w-full text-end bg-orange-l6 dark:bg-blue-d7 border-t border-gray-l2 dark:border-bluegray">
        <button
          type="button"
          className="rounded btn-orange font-body px-8 py-2 max-sm:w-full"
          onClick={() => closeModal()}
        >
          {type === "success" ? "Done" : "Ok"}
        </button>
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
    default:
      return <LoaderRing thickness={4} classes={common + ""} />;
  }
}
