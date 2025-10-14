import type { Progress } from "@better-giving/reg";
import { NavLink } from "react-router";

type TStep = Exclude<Progress["step"], 6>; // exclude summary step
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
      } border-gray-l3 `}
    >
      <p className="mr-auto text-left">{title[num]}</p>

      <p className="text-green  font-medium max-sm:row-start-2">{status}</p>

      <NavLink
        to={`../${num}`}
        className="min-w-[8rem] ml-6 max-sm:row-span-2 btn-outline btn text-sm"
        aria-disabled={disabled}
      >
        Update
      </NavLink>
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
