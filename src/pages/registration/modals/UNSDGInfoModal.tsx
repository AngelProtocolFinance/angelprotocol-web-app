import { Handler } from "types/types";
import { BsX } from "react-icons/bs";
type Props = {
  clickHandler: Handler;
};

const UNSDGInfoModal = ({ clickHandler }: Props) => {
  return (
    <div className="bg-white-grey w-96 p-5 rounded-xl shadow-lg text-center">
      <div className="-mr-2 flex justify-end">
        <BsX onClick={clickHandler} className="text-gray-300 text-2xl">
          X
        </BsX>
      </div>
      <p className="text-base text-thin-blue mb-3">
        This will define your category on our platform. If you don’t purely
        identify with any, please choose #17
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

export default UNSDGInfoModal;
