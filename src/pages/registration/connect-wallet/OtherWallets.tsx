import { useHistory } from "react-router";
import { BsExclamationCircle } from "react-icons/bs";
import { useState } from "react";
import Modal from "components/Modal/Modal";
import CustodianInfoModal from "../modals/CustodianInfoModal";
import SelfCustodyInfoModal from "../modals/SelfCustodyInfoModal";
import { register } from "types/routes";

const OtherWallets = () => {
  //url = app/register/other-wallet
  const history = useHistory();
  const [isOpenModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const showInfoModal = (type: any) => {
    console.log("sadfasdfasdfasdfasdf");
    setModalType(type);
    setOpenModal(true);
  };
  return (
    <div className="">
      <div className="title mb-5">
        <p className="text-3xl font-bold lg:w-4/5 mx-auto">
          There are two ways to interact with Angel Protocol: either you
          self-custody your funds or you use our custodian partner{" "}
          <span className="text-orange underline cursor-pointer">
            PrimeTrust
          </span>
        </p>
      </div>
      <div className="text-center mb-6">
        <div className="flex items-center pt-3 justify-center">
          <button
            className="bg-thin-blue w-60 h-10 rounded-xl uppercase text-base font-bold text-white mr-1"
            onClick={() => {
              history.push(register.self_custody);
            }}
          >
            self custody
          </button>
          <BsExclamationCircle
            className="text-xl text-thin-blue cursor-pointer"
            onClick={() => showInfoModal("self_custody")}
          />
        </div>
        <br />
        <div className="flex items-center my-2 justify-center">
          <button className="bg-gray-300 w-60 h-10 rounded-xl uppercase text-base font-bold text-white mr-1">
            Prime trust
          </button>
          <BsExclamationCircle
            className="text-xl text-thin-blue cursor-pointer"
            onClick={() => showInfoModal("prime_trust")}
          />
        </div>
      </div>
      <div className="pt-5">
        <p className="text-md">
          Primetrust, coming soon, we'll keep you posted!
        </p>
        <button
          className="bg-orange w-72 h-10 rounded-xl uppercase text-base font-bold text-white mt-3"
          onClick={() => {
            history.push(register.wallet_check);
          }}
        >
          back
        </button>
      </div>
      {isOpenModal && modalType === "prime_trust" && (
        <Modal>
          <CustodianInfoModal />
        </Modal>
      )}
      {isOpenModal && modalType === "self_custody" && (
        <Modal>
          <SelfCustodyInfoModal />
        </Modal>
      )}
    </div>
  );
};

export default OtherWallets;
