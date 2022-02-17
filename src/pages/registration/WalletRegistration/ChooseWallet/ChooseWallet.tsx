import Loader from "components/Loader/Loader";
import { Link } from "react-router-dom";
import Web3Auth from "./Web3Auth";
import useOpenLogin from "../useOpenLogin";
import { BsExclamationCircle } from "react-icons/bs";
import { useSetModal } from "components/Nodal/Nodal";
import TerraInfoModal from "pages/registration/modals/TerraInfoModal";

export default function ChooseWallet() {
  const { isLoading, login } = useOpenLogin();
  const { showModal } = useSetModal();

  const showTerraInfoModal = () => showModal(TerraInfoModal, {});

  if (isLoading) {
    return <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />;
  }

  return (
    <div className="flex flex-col gap-5 items-center">
      <h2 className="lg:text-2xl font-semibold flex gap-1 items-center">
        <span>
          Please choose one of the options below to register your Terra wallet
        </span>
        <BsExclamationCircle
          className="text-xl text-thin-blue cursor-pointer"
          onClick={showTerraInfoModal}
        />
      </h2>
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
<TerraInfoModal />;
