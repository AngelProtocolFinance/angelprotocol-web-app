import Loader from "components/Loader/Loader";
import { Link } from "react-router-dom";
import Web3Auth from "./Web3Auth";
import useOpenLogin from "./useOpenLogin";

export default function ChooseWallet() {
  const { isLoading, login } = useOpenLogin();

  if (isLoading) {
    return <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />;
  }

  return (
    <div className="flex flex-col gap-5 items-center">
      <h2 className="text-3xl font-semibold">Register your wallet</h2>
      <Web3Auth onLogin={login} />
      <Link
        to=""
        className="uppercase text-bright-blue text-sm hover:underline"
      >
        Connect a terra station wallet
      </Link>
    </div>
  );
}
