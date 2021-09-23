import Modal from "components/Modal/Modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "types/types";
import WalletTemplateModal from "../modals/WalletTemplateModal";

const StepsDocs = () => {
  const userData: any = JSON.parse(localStorage.getItem("userData") || "{}");
  const [isOpenModal, setOpenModal] = useState(false);
  const showInfoModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <div>
      <div className="title text-center mb-5">
        <p className="text-3xl font-bold">
          Please upload the following documentation:
        </p>
        <p className="text-base">
          you can upload a file or simple drag and drop to the correct area.
        </p>
      </div>
      <div className="steps my-10">
        <div className="step-1 md:flex justify-between items-center mb-5">
          <div className="md:w-1/3 xl:w-1/2 mb-2 md:mb-0">
            <p className="font-bold text-base max-w-xs text-left xl:ml-32">
              Your Proof of Identity
            </p>
          </div>
          <div className="md:w-2/3 xl:w-1/2 flex items-center">
            <button className="bg-yellow-blue w-64 h-10 rounded-xl uppercase text-base font-bold text-white mr-5">
              upload new file
            </button>
            <p className="text-green-500 uppercase text-sm xl:text-base">
              complete
            </p>
          </div>
        </div>
        <div className="step-1 md:flex justify-between mb-5">
          <div className="md:w-1/3 xl:w-1/2 mb-2 md:mb-0">
            <p className="font-bold text-base max-w-xs text-left xl:ml-32">
              Documentation attesting of your {userData.role} position in{" "}
              {userData.charityName}{" "}
            </p>
          </div>
          <div className="flex items-center md:w-2/3 xl:w-1/2">
            <button className="bg-thin-blue w-64 h-10 rounded-xl uppercase text-base font-bold text-white mr-5">
              select or drag and drop
            </button>
            <p className="text-red-500 uppercase text-sm xl:text-base">
              Not submitted
            </p>
          </div>
        </div>
        <div className="step-1 md:flex justify-between">
          <div className="md:w-1/3 xl:w-1/2 mb-2 md:mb-0">
            <p className="font-bold text-base max-w-xs text-left xl:ml-32">
              Resolution approving the creation of an Endowment on Angel
              Protocol with the Terra address {userData.wallet_address} <br />
              <span
                className="text-orange text-xs underline text-left cursor-pointer"
                onClick={showInfoModal}
              >
                See Template
              </span>
            </p>
          </div>
          <div className="flex items-center md:w-2/3 xl:w-1/2">
            <button className="bg-thin-blue w-64 h-10 rounded-xl uppercase text-base font-bold text-white mr-5">
              select or drag and drop
            </button>
            <p className="text-red-500 uppercase text-sm xl:text-base">
              Not submitted
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 text-center flex justify-center">
        <div>
          <div className="flex items-center py-2">
            <label>
              <input type="checkbox" name="checkedPolicy" className="mr-2" />
              <span className="text-base">
                {" "}
                By checking this box, you declare that you have read and agreed
                our{" "}
                <Link to={routes.privacy_policy} className="underline">
                  Privacy Policy
                </Link>
                <span className="text-base text-failed-red">*</span>
              </span>
            </label>
          </div>
          <button className="bg-thin-blue w-48 h-10 rounded-xl uppercase text-base font-bold text-white mt-3">
            upload
          </button>
        </div>
      </div>
      {isOpenModal && (
        <Modal>
          <WalletTemplateModal />
        </Modal>
      )}
    </div>
  );
};

export default StepsDocs;
