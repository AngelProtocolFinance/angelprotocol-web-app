import { ArrowRight } from "lucide-react";

const Button = ({ text }: { text: string }) => {
  return (
    <button className="px-8 py-3.5 btn-blue rounded-[40px] font-semibold text-base flex items-center  gap-1 font-heading self-center">
      {text}
      <ArrowRight size={20} className=" ml-1" />
    </button>
  );
};

export default Button;
