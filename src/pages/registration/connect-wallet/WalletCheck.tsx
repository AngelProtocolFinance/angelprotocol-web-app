import Modal from "components/Modal/Modal";
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { register } from "types/routes";
import TerraInfoModal from "../Modals/TerraInfoModal";

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
      <div className="text-center">
        <button
          className="bg-thin-blue w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3"
          onClick={() => history.push(register.select_wallet)}
        >
          YES
        </button>
        <br />
        <button
          className="bg-thin-blue w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3"
          onClick={() => {
            history.push(register.others);
          }}
        >
          NO
        </button>
      </div>
      {isOpenModal && (
        <Modal>
          <TerraInfoModal />
        </Modal>
      )}
    </div>
  );
};

export default WalletCheck;
