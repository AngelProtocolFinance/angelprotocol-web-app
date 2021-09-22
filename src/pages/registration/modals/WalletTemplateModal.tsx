import { Handler } from "types/types";
import { BsX } from "react-icons/bs";
type Props = {
  clickHandler: Handler;
};

const WalletTemplateModal = ({ clickHandler }: Props) => {
  return (
    <div className="bg-white-grey w-96 p-5 rounded-xl shadow-lg text-center">
      <div className="-mr-2 flex justify-end">
        <BsX onClick={clickHandler} className="text-gray-300 text-2xl">
          X
        </BsX>
      </div>
      <p className="text-base text-thin-blue">
        you can use this template for your resolution:
      </p>
      <p className="text-base text-thin-blue my-3">
        [LEGAL TEXT] PREPARED BY US USING [CHARITY NAME] and [WALLET ADDRESS]
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

export default WalletTemplateModal;
