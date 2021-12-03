import Modal from "components/Modal/Modal";
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { registration } from "types/routes";
import Action from "../../../components/ActionButton/Action";
import TerraInfoModal from "../modals/TerraInfoModal";

const SelectWallet = () => {
  //url = app/register/select-wallet
  const history = useHistory();
  const [isOpenModal, setOpenModal] = useState(false);
  const showTerraInfoModal = () => {
    setOpenModal(true);
  };
  return (
    <div>
      <div className="title mb-3 flex items-center justify-center">
        <h2 className="text-3xl font-bold mr-1">
          How do you want to connect to your wallet?
        </h2>
        <BsExclamationCircle
          className="text-xl text-thin-blue cursor-pointer"
          onClick={showTerraInfoModal}
        />
      </div>
      <div className="terra-connect-btns mb-7">
        <div>
          <button className="bg-thin-blue w-96 h-10 rounded-xl uppercase text-base font-bold text-white mt-3">
            Terra station mobile extension
          </button>
        </div>
        <div>
          <button
            className="bg-thin-blue w-96 h-10 rounded-xl uppercase text-base font-bold text-white mt-3"
            onClick={() => {
              history.push(registration.connect_wallet);
            }}
          >
            Terra station chrome extension
          </button>
        </div>
        <div>
          <button className="bg-gray-300 w-96 h-10 rounded-xl uppercase text-base font-bold text-white mt-3">
            Prime trust
          </button>
        </div>
        <div>
          <button className="bg-thin-blue w-96 h-10 rounded-xl uppercase text-base font-bold text-white mt-3">
            other means
          </button>
        </div>
      </div>
      <div className="back-btn">
        <p className="mb-5">
          Thanks, we've been notified and we'll get in tough with you very soon!
        </p>
        <Action
          onClick={() => history.push(registration.wallet_check)}
          title="Back"
          classes="bg-thin-blue w-48 h-10"
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

export default SelectWallet;
