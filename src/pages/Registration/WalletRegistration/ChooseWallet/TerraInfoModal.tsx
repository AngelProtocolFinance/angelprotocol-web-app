import { BsX } from "react-icons/bs";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import { Button } from "../../common";

export default function TerraInfoModal() {
  const { closeModal } = useModalContext();

  return (
    <div className="bg-white-grey max-w-sm p-3 pb-5 rounded-xl shadow-lg text-center text-thin-blue">
      <BsX
        className="text-gray-300 text-2xl ml-auto hover:cursor-pointer"
        onClick={closeModal}
      />
      <p className="p-4">
        <b>Terra</b> is the blockchain on which Angel Protocol is built.
      </p>
      <p className="p-4">
        A <b>Terra wallet</b> is a virtual account siting on the Terra
        blockchain. It has a unique public/private addresses pair, can hold
        balances and is used to sign transactions.
      </p>
      <Button className="bg-thin-blue w-40 h-10" onClick={closeModal}>
        Got it
      </Button>
    </div>
  );
}
