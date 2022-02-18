import Loader from "components/Loader/Loader";
import { Link, useRouteMatch } from "react-router-dom";
import routes from "../routes";
import useOpenLogin from "../useOpenLogin";
import Title from "./Title";
import Web3Auth from "./Web3Auth";

export default function ChooseWallet() {
  const { isLoading, login } = useOpenLogin();
  const { path } = useRouteMatch();

  if (isLoading) {
    return <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />;
  }

  return (
    <div className="flex flex-col gap-5 items-center">
      <Title />
      <Web3Auth onLogin={login} />
      <Link
        to={`${path}/${routes.connect}`}
        className="uppercase text-bright-blue text-sm hover:underline mb-5 lg:mb-0"
      >
        Or click here if you already have a Terra wallet that you would like to
        use
      </Link>
    </div>
  );
}
