import { useState } from "react";
// import Modal from "react-modal";
// import { CharityInfo } from "./CharityInfo";

interface DonationInfoProps {
  isDonate: boolean;
  onToggleDonation: () => void;
}
export function DonationInfo({
  isDonate,
  onToggleDonation,
}: DonationInfoProps) {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openInfoModal() {
    setIsOpen(true);
  }

  function closeInfoModal() {
    setIsOpen(false);
  }
  return (
    <div className="md:divide-y">
      <div className="mb-2 md:block flex">
        <div className="md:w-full w-1/2">
          {!isDonate ? (
            <button
              className="uppercase bg-orange rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center mb-4"
              onClick={onToggleDonation}
            >
              DONATE NOW
            </button>
          ) : (
            <button
              className="uppercase bg-yellow-blue rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center mb-4"
              onClick={onToggleDonation}
            >
              BACK TO CHARITY
            </button>
          )}
        </div>
        <div className="md:w-full w-1/2">
          <button className="uppercase bg-thin-blue rounded-xl w-48 h-12 d-flex justify-center items-center mb-2 lg:block hidden">
            VISIT SITE
          </button>
          <button
            className="uppercase bg-thin-blue rounded-xl w-48 h-12 d-flex justify-center items-center mb-2 lg:hidden block"
            onClick={openInfoModal}
          >
            Info
          </button>
        </div>
      </div>
      <div className="donation-info mt-2 pt-2">
        <div className="donation-info-item mb-4">
          <p className="uppercase">Total donations</p>
          <span className="text-4xl">$4.200</span>
        </div>
        <div className="md:block flex justify-between">
          <div className="donation-info-item mb-4 md:w-full w-1/2">
            <p className="uppercase">Angel ranking this week</p>
            <span className="text-xl">
              <span className="text-leaf-green">&#9650;</span> #300
            </span>
          </div>
          <div className="donation-info-item mb-4 md:w-full w-1/2">
            <p className="uppercase">Angel ranking last week</p>
            <span className="text-xl">#498</span>
          </div>
        </div>
        <div className="md:block flex justify-between">
          <div className="donation-info-item mb-4 md:w-full w-1/2">
            <p className="uppercase">Donations per month</p>
            <span className="text-xl">
              <span className="text-leaf-green">&#9650;</span> 48.9
            </span>
          </div>
          <div className="donation-info-item mb-4 md:w-full w-1/2">
            <p className="uppercase">AVG. donation</p>
            <span className="text-xl">
              <span className="text-dark-red">&#9660;</span> $57.7
            </span>
          </div>
        </div>
      </div>
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeInfoModal}
        contentLabel="Example Modal"
        className="absolute inset-1/2 bottom-auto right-auto max-w-4/5 min-h-modal rounded-3xl bg-white transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex justify-center">
          <div className="p-4 mx-auto text-thin-blue">
            <h2 className="text-2xl uppercase font-bold mb-2">charity info</h2>
            <CharityInfo />
          </div>
        </div>
      </Modal> */}
    </div>
  );
}
