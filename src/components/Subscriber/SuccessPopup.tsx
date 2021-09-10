import { Handler } from "./Subscriber";
import { FaCheck } from "react-icons/fa";

type Props = {
  clickHandler: Handler;
};

export default function SuccessPopup({ clickHandler }: Props) {
  return (
    <div className="bg-white-grey w-72 rounded-sm shadow-lg">
      <div className="bg-angel-blue text-white font-semibold p-2 flex items-center">
        <FaCheck className="mr-2" /> Success
      </div>
      <p className="p-5 font-semibold text-angel-grey">
        Thank you for subscribing!
      </p>
      <div className="p-2 flex justify-end">
        <button
          className="bg-blue-accent text-white-grey uppercase py-1 px-3 rounded-sm"
          onClick={clickHandler}
        >
          OK
        </button>
      </div>
    </div>
  );
}
