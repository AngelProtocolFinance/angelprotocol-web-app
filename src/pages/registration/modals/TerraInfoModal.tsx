import { useModalCloser } from "components/Modal/Modal";
import { BsX } from "react-icons/bs";

const TerraInfoModal = () => {
  const closeModal = useModalCloser();
  return (
    <div className="bg-white-grey w-96 p-5 rounded-xl shadow-lg text-center">
      <div className="-mr-2 flex justify-end">
        <BsX onClick={closeModal} className="text-gray-300 text-2xl">
          X
        </BsX>
      </div>
      <p className="text-base text-thin-blue">
        <b>Terra</b> is the blockchain on which Angel Protocol is built.
      </p>
      <p className="text-base text-thin-blue my-3">
        A <b>Terra wallet</b> is a virtual account siting on the Terra
        blockchain. It has a unique public/private addresses pair, can hold
        balances and is used to sign transactions.
      </p>
      <button
        className="bg-thin-blue w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3"
        onClick={closeModal}
      >
        GOT IT
      </button>
    </div>
  );
};

export default TerraInfoModal;
