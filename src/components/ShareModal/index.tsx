import { FaFacebookSquare, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

type Props = {
  onClose: () => void;
};

export default function ShareModal({ onClose }: Props) {
  return (
    <div className={`max-w-md w-11/12 relative bg-white rounded-md pt-4`}>
      <button
        onClick={onClose}
        className="absolute right-2 top-2 text-angel-grey hover:text-black"
      >
        <MdOutlineClose />
      </button>
      <div className="md:p-4">
        <div className="text-3xl md:text-5xl uppercase text-thin-blue text-center font-bold">
          <p className="md:mb-2">let the</p>
          <p className="mb-3 md:mb-6">world know!</p>
        </div>
        <div className="rounded-xl bg-white-grey p-3 w-2/3 flex justify-center mx-auto">
          <span className="text-gray-400 text-sm">
            I just donated on @AngelProtocol! Every gift is invested to provide
            sustainable funding for non-profits: Give once, give forever. Please
            join me in providing charities with financial freedom:
            https://app.angelprotocol.io
          </span>
        </div>
        <div className="flex justify-center my-5 text-3xl text-thin-blue">
          <div className="flex justify-center items-center rounded-full border-thin-blue p-2 border-2 border-solid mx-1">
            <FaTwitter />
          </div>
          <div className="flex justify-center items-center rounded-full border-thin-blue p-2 border-2 border-solid mx-1">
            <FaLinkedin />
          </div>
          <div className="flex justify-center items-center rounded-full border-thin-blue p-2 border-2 border-solid mx-1">
            <FaFacebookSquare />
          </div>
        </div>
      </div>
    </div>
  );
}
