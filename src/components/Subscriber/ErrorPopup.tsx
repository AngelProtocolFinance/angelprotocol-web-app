import { Handler } from "types/types";
import { AiFillWarning } from "react-icons/ai";

type Props = {
  clickHandler: Handler;
};

export default function ErrorPopup({ clickHandler }: Props) {
  return (
    <div className="bg-white-grey w-72 rounded-sm shadow-lg">
      <div className="bg-red-700 text-white font-semibold p-2 flex items-center">
        <AiFillWarning className="mr-2" /> Error
      </div>
      <p className="p-5">Something went wrong</p>
      <div className="p-2 flex justify-end">
        <button
          className="bg-red-400 text-white-grey uppercase py-1 px-3 rounded-sm"
          onClick={clickHandler}
        >
          OK
        </button>
      </div>
    </div>
  );
}
