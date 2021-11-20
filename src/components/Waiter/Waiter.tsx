import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiLink } from "react-icons/ri";
import useWaiter from "./useWaiter";
export default function Waiter() {
  const { pending_tx, loading } = useWaiter();
  if (!pending_tx) {
    return null;
  }
  return (
    <div className="fixed z-20 shadow-lg top-8 right-4">
      {loading && (
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={`https://ropsten.etherscan.io/tx/${pending_tx?.hash}`}
          className="block bg-white hover:bg-angel-blue text-angel-blue hover:text-white flex items-center rounded-full p-2 py-1"
        >
          <AiOutlineLoading3Quarters
            className={`${(loading && "animate-spin") || ""}`}
          />
          <span className="uppercase text-sm pr-3 ml-2">pending tx</span>
          <RiLink />
        </a>
      )}
    </div>
  );
}
