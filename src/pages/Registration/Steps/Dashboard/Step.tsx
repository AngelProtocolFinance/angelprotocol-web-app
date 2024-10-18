import type { RegStep } from "pages/Registration/types";
import { Link } from "react-router-dom";

type TStep = Exclude<RegStep, 6>; // exclude summary step
type Props = {
  disabled: boolean;
  num: TStep;
  status?: string;
};

export default function Step({
  num,
  status = "Completed" /** not possible to visit this page without completing steps */,
  disabled,
}: Props) {
  return (
    <div
      className={`py-6 pl-2 pr-4 grid grid-cols-[1fr_auto_auto] items-center border-b ${
        num === 1 ? "border-t" : ""
      } border-gray-l4 `}
    >
      <p className="mr-auto text-left">{title[num]}</p>

      <p className="text-green font-semibold max-sm:row-start-2">{status}</p>

      <Link
        to={`../${num}`}
        className="min-w-[8rem] ml-6 max-sm:row-span-2 btn-outline-filled btn-reg"
        aria-disabled={disabled}
      >
        Update
      </Link>
    </div>
  );
}

const title: { [key in TStep]: string } = {
  1: "Contact Details",
  2: "Organization",
  3: "IRC 501(c)(3)",
  4: "Documentation",
  5: "Banking",
};
