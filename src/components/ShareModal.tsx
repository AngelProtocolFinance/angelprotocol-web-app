import Modal from "react-modal";
import { FaFacebookSquare, FaLinkedin, FaTwitter } from "react-icons/fa";

interface ShareModalProps {
  modalIsOpen: boolean;
  closeShareModal: () => void;
}

export function ShareModal({ modalIsOpen, closeShareModal }: ShareModalProps) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeShareModal}
      contentLabel="Example Modal"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "30%",
          minHeight: "300px",
        },
      }}
    >
      <div className="flex justify-center">
        <div className="p-4  mx-auto">
          <div className="flex justify-end">
            <button onClick={closeShareModal} className="text-xl justify-end">
              X
            </button>
          </div>
          <p className="text-5xl uppercase text-thin-blue mb-6 text-center font-bold">
            let the world know!
          </p>
          <div className="rounded-xl bg-white-grey p-3 w-2/3 flex justify-center mx-auto">
            <span className="text-grey text-sm">
              I just donated $xxx on @Angel Protocol! Every gift is invested to
              provide sustainable funding for non-profits: Give once, give
              forever. Please join me in providing charities with financial
              freedom: https://app.angelprotocol.io
            </span>
          </div>
          <div className="flex justify-center my-5 text-3xl text-thin-blue">
            <div className="flex justify-center items-center rounded-full border-thin-blue p-2 border-2 border-solid mx-1">
              <FaTwitter />
            </div>
            <div className="flex justify-center items-center rounded-full border-thin-blue p-2 border-2 border-solid mx-1">
              <FaLinkedin />
            </div>
            <div className="flex justify-center items-center rounded-full border-thin-blue p-2 border-2 border-solid mx-1">
              <FaFacebookSquare />
            </div>
          </div>
          <div className="flex justify-center mx-auto mt-2">
            <button className="uppercase bg-thin-blue rounded-xl w-48 h-12 d-flex justify-center items-center mb-4">
              Share
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
