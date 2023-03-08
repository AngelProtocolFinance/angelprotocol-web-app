import { Connection } from "contexts/WalletContext/types";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import Image from "components/Image";

export default function Connector(props: Connection) {
  const { handleError } = useErrorContext();
  const { closeModal } = useModalContext();

  async function handleConnect() {
    try {
      closeModal();
      await props.connect();
    } catch (error: any) {
      handleError(error);
    }
  }

  return (
    <button
      className="flex flex-col items-center justify-center gap-1 h-28 p-5 border border-gray-l3 rounded bg-white hover:bg-orange-l5 dark:bg-blue/50 hover:dark:bg-blue-d3 dark:border-none"
      onClick={handleConnect}
    >
      <Image
        img={{ src: props.logo }}
        className="w-12 h-12 border border-prim rounded-full"
      />
      <span className="font-heading font-bold text-sm capitalize">
        {props.name}
      </span>
    </button>
  );
}
