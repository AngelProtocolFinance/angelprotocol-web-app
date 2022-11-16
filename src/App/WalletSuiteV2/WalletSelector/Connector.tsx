import { Connection } from "contexts/WalletContext/types";
import { useErrorContext } from "contexts/ErrorContext";

export default function Connector(props: Connection) {
  const { handleError } = useErrorContext();

  const isMulti = "networks" in props;

  async function handleConnect() {
    try {
      if (isMulti) throw new Error("Need to choose network first");
      await props.connect();
    } catch (error: any) {
      handleError(error);
    }
  }

  if (isMulti) {
    return null;
  }

  return (
    <button
      className="flex flex-col items-center justify-center gap-1 h-28 p-5 border border-gray-l2 rounded bg-white"
      onClick={handleConnect}
    >
      <Logo logo={props.logo} />
      <span className="font-heading font-bold text-sm">{props.name}</span>
    </button>
  );
}

function Logo({ logo }: { logo: string }) {
  return <img src={logo} className="w-12 h-12 object-contain" alt="" />;
}
