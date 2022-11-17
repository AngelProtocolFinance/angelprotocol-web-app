import { BsX } from "react-icons/bs";
import { useModalContext } from "contexts/ModalContext";
import { BtnSec } from "components/registration";

export default function WalletInfoModal() {
  const { closeModal } = useModalContext();

  return (
    <div className="fixed-center w-full max-w-sm p-3 pb-5 z-20 rounded-xl shadow-lg text-center bg-white text-blue">
      <BsX
        className="text-gray-l1 text-2xl ml-auto hover:cursor-pointer"
        onClick={closeModal}
      />
      <p className="p-4">
        <b>Keplr wallet</b> is an account sitting on the Juno blockchain on
        which Angel Protocol is built. It is in effect your ‘virtual bank
        account’, has unique public and private addresses, will hold your
        endowment balances and is used to authorise transactions.
      </p>
      <BtnSec onClick={closeModal}>Got it</BtnSec>
    </div>
  );
}
