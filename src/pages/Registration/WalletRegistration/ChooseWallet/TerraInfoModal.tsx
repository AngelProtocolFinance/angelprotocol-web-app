import { BsX } from "react-icons/bs";
import { useModalContext } from "contexts/ModalContext";
import { Button } from "../../common";

export default function TerraInfoModal() {
  const { closeModal } = useModalContext();

  return (
    <div className="fixed-center w-full max-w-sm p-3 pb-5 z-20 rounded-xl shadow-lg text-center bg-white-grey text-thin-blue">
      <BsX
        className="text-gray-300 text-2xl ml-auto hover:cursor-pointer"
        onClick={closeModal}
      />
      <p className="p-4">
        A <b>Terra wallet</b> is an account sitting on the Terra blockchain on
        which Angel Protocol is built. It is in effect your ‘virtual bank
        account’, has unique public and private addresses, will hold your
        endowment balances and is used to authorise transactions.
      </p>
      <Button className="bg-thin-blue w-40 h-10" onClick={closeModal}>
        Got it
      </Button>
    </div>
  );
}
