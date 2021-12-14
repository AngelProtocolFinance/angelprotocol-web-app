import useAction from "components/Ethereum/useAction";
import Modal from "components/Modal/Modal";
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { registration } from "types/routes";
import Action from "../../../components/ActionButton/Action";
import TerraInfoModal from "../modals/TerraInfoModal";
import { Connectors as Connects, Icons } from "components/WalletSuite/types";

const WalletCheck = () => {
  const { handleConnect, isLoading } = useAction(Connects.torus, Icons.torus);
  //url = app/register/wallet-check
  const history = useHistory();
  const [isOpenModal, setOpenModal] = useState(false);
  const showTerraInfoModal = () => {
    setOpenModal(true);
  };

  return (
    <div className="text-center">
      <div className="flex items-center mb-5 justify-center">
        <h2 className="text-3xl font-bold mr-1">
          Do you have a Terra wallet address?
        </h2>
        <BsExclamationCircle
          className="text-xl text-thin-blue cursor-pointer"
          onClick={showTerraInfoModal}
        />
      </div>
      <div className="text-center">
        <div>
          <Action
            onClick={() => history.push(registration.select_wallet)}
            title="YES"
            classes="bg-thin-blue w-48 h-10"
          />
        </div>
        <div>
          <Action
            // onClick={() => history.push(registration.others)}
            onClick={handleConnect}
            title="NO"
            classes="bg-orange w-48 h-10"
          />
        </div>
        <Action
          onClick={() => history.push(registration.status)}
          title="Back"
          classes="bg-dark-grey w-48 h-10"
        />
      </div>
      {isOpenModal && (
        <Modal setShown={() => setOpenModal(false)}>
          <TerraInfoModal />
        </Modal>
      )}
    </div>
  );
};

export default WalletCheck;
