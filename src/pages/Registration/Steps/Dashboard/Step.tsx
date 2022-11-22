import { RegStep } from "pages/Registration/types";
import { BtnSec } from "components/registration";
import { useRegState } from "../StepGuard";

type TStep = Exclude<RegStep, 4>;
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
  const {
    data: { init },
  } = useRegState<4>();

  return (
    <div
      className={`py-6 pl-2 pr-4 grid grid-cols-[1fr_auto_auto] items-center border-b ${
        num === 1 ? "border-t" : ""
      } border-gray-l2 dark:border-bluegray `}
    >
      <p className="mr-auto text-left">{title[num]}</p>

      <p className="text-green font-semibold max-sm:row-start-2">{status}</p>

      <BtnSec
        as="link"
        to={`../${num}`}
        className="min-w-[8rem] ml-6 max-sm:row-span-2"
        aria-disabled={disabled}
        state={init}
      >
        Update
      </BtnSec>
    </div>
  );
}

const title: { [key in TStep]: string } = {
  1: "Contact Details",
  2: "Documentation",
  3: "Wallet address",
};
