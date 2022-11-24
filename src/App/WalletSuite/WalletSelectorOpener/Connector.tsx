import { useState } from "react";
import { Connection } from "contexts/WalletContext/types";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import ContentLoader from "components/ContentLoader";

export default function Connector(props: Connection) {
  const { handleError } = useErrorContext();
  const { closeModal } = useModalContext();

  async function handleConnect() {
    try {
      await props.connect();
      closeModal();
    } catch (error: any) {
      handleError(error);
    }
  }

  return (
    <button
      className="flex flex-col items-center justify-center gap-1 h-28 p-5 border border-gray-l2 rounded bg-white hover:bg-orange-l5 dark:bg-blue/50 hover:dark:bg-blue-d3 dark:border-none"
      onClick={handleConnect}
    >
      <Logo logo={props.logo} />
      <span className="font-heading font-bold text-sm capitalize">
        {props.name}
      </span>
    </button>
  );
}

function Logo({ logo }: { logo: string }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      {isLoading && <ContentLoader className="w-12 h-12 rounded" />}
      <img
        src={logo}
        className={`w-12 h-12 object-contain ${isLoading ? "hidden" : ""}`}
        alt=""
        onLoad={() => setLoading(false)}
      />
    </>
  );
}
