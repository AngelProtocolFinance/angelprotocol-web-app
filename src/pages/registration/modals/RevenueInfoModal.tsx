import { Handler } from "types/types";
import { BsX } from "react-icons/bs";
type Props = {
  clickHandler: Handler;
};

const RevenueInfoModal = ({ clickHandler }: Props) => {
  return (
    <div className="bg-white-grey w-96 p-5 rounded-xl shadow-lg text-center">
      <div className="-mr-2 flex justify-end">
        <BsX onClick={clickHandler} className="text-gray-300 text-2xl">
          X
        </BsX>
      </div>
      <p className="text-thin-blue my-3 text-base">
        This is the number used to set goals for sourcing reliable funding
        through returns on endowment [ex goal] = increase source of reliable
        funding from 5% to 20% over next 5 years
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

export default RevenueInfoModal;
