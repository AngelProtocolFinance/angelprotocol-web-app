import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Button = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link className="self-center" to={href}>
      <button className="px-8 py-3.5 bg-blue-d1 text-white rounded-[40px] font-semibold text-base font-heading flex items-center gap-1">
        {text}
        <FaArrowRightLong size={20} className="ml-1" />
      </button>
    </Link>
  );
};

export default Button;
