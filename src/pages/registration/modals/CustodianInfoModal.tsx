import { Handler } from "types/types";
import { BsX } from "react-icons/bs";
type Props = {
  clickHandler: Handler;
};

const CustodianInfoModal = ({ clickHandler }: Props) => {
  return (
    <div className="bg-white-grey w-96 p-5 rounded-xl shadow-lg text-center">
      <div className="-mr-2 flex justify-end">
        <BsX onClick={clickHandler} className="text-gray-300 text-2xl">
          X
        </BsX>
      </div>
      <p className="text-thin-blue text-base">
        A <b>Custodian</b> is a service provider that will create a Terra wallet
        for you. They have a fiduciary duty to keep the private key of your
        wallet safe of any loss or theft. They will also provide you with an
        account in USD that will be able to withdraw to y our reguilar bank
        account.
      </p>
      <p className="text-thin-blue text-base mt-5 mb-3">
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

export default CustodianInfoModal;
