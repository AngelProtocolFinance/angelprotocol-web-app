import { Handler } from "types/types";
import { BsX } from "react-icons/bs";
type Props = {
  clickHandler: Handler;
};

const SelfCustodyInfoModal = ({ clickHandler }: Props) => {
  return (
    <div className="bg-white-grey w-96 p-5 rounded-xl shadow-lg text-center">
      <div className="-mr-2 flex justify-end">
        <BsX onClick={clickHandler} className="text-gray-300 text-2xl">
          X
        </BsX>
      </div>
      <p className="text-thin-blue text-base">
        When you <b>self-custody</b> your funds, you create a Terra wallet
        directly and are responsible to safeguard the private key of your
        wallet. The private key is used to sign transactions and is a proof of
        ownership of your wallet. If you lose it or it is stolen, you will not
        be able to access your funds.
      </p>
      <p className="text-thin-blue mt-5 mb-3 text-base">
        To interact with Angel Protocol, you would need to install the Terra
        Station Chrome Extension or the Terra Station Mobile app.
      </p>
      <button
        className="bg-thin-blue w-40 h-10 rounded-xl uppercase text-base font-bold text-white mt-3"
        onClick={clickHandler}
      >
        GOT IT
      </button>
    </div>
  );
};

export default SelfCustodyInfoModal;
