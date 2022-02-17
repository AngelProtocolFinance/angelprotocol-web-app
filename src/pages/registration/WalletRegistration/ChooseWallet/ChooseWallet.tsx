import Loader from "components/Loader/Loader";
import { Link } from "react-router-dom";
import Web3Auth from "./Web3Auth";
import useOpenLogin from "../useOpenLogin";
import Title from "./Title";

export default function ChooseWallet() {
  const { isLoading, login } = useOpenLogin();

  if (isLoading) {
    return <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />;
  }

  return (
    <div className="flex flex-col gap-5 items-center">
      <Title />
      <Web3Auth onLogin={login} />
      <Link
        to=""
        className="uppercase text-bright-blue text-sm hover:underline mb-5 lg:mb-0"
      >
        Or click here if you already have a Terra wallet that you would like to
        use
      </Link>
    </div>
  );
}
