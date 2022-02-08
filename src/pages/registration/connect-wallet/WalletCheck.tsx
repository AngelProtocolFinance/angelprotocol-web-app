import Modal from "components/Modal/Modal";
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { registration } from "types/routes";
import Action from "../../../components/ActionButton/Action";
import TerraInfoModal from "../modals/TerraInfoModal";

const WalletCheck = () => {
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
      <div className="flex flex-col items-center gap-3">
        <Action
          onClick={() => history.push(registration.select_wallet)}
          title="YES"
          classes="bg-thin-blue w-48 h-10"
        />
        <Action
          onClick={() => {
            alert("clicked NO");
          }}
          title="NO"
          classes="bg-orange w-48 h-10"
        />
        <Action
          onClick={() => history.push(registration.endowment_data)}
          title="Back"
          classes="bg-dark-grey w-48 h-10 mt-5"
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
