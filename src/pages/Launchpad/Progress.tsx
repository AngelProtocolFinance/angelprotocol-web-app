import { PropsWithChildren, useState } from "react";
import { Link } from "react-router-dom";
import { DrawerIcon } from "components/Icon";
import { useGetter } from "store/accessors";
import useHandleScreenResize, { SCREEN_MD } from "hooks/useHandleScreenResize";
import { steps } from "./constants";

type Props = { currentStep: number; classes?: string };

type Steps = keyof typeof steps;
const labels: { [K in Steps]: string } = {
  "2": "Management",
  "3": "Whitelists",
  "4": "Maturity",
  "5": "Split of Contribution",
  "6": "Fees",
  "7": "Connect Wallet",
  "8": "Summary",
};

export default function Progress({ currentStep, classes = "" }: Props) {
  const { progress: p } = useGetter((state) => state.launchpad);
  const [isOtherStepsShown, setIsOtherStepsShown] = useState(true);

  useHandleScreenResize(
    (screen, ref) => {
      const shouldOpen = screen >= SCREEN_MD; /** tailwind md screen size */
      if (shouldOpen && !ref.isOpen) {
        setIsOtherStepsShown(shouldOpen);
        ref.isOpen = shouldOpen;
      } else if (!shouldOpen && ref.isOpen) {
        setIsOtherStepsShown(shouldOpen);
        ref.isOpen = shouldOpen;
      }
    },
    {
      shouldAttachListener: true,
      shouldCallOnResizeOnLoad: true,
      debounceTime: 150,
      ref: { isOpen: isOtherStepsShown },
    }
  );

  return (
    <div className={`py-4 pl-6 pr-4 ${classes} dark:text-gray`}>
      <div className="relative">
        <Step
          classes="relative"
          currentStep={currentStep}
          progress={p}
          step={allSteps[1]}
        >
          About
        </Step>
        <button
          className="absolute top-1/2 -right-5 transform -translate-y-1/2 md:hidden"
          onClick={() => {
            setIsOtherStepsShown((prev) => !prev);
          }}
        >
          <DrawerIcon className="" isOpen={isOtherStepsShown} size={25} />
        </button>
      </div>

      {isOtherStepsShown &&
        Object.values(steps).map((step) => (
          <Step currentStep={currentStep} progress={p} step={step}>
            {step.label}
          </Step>
        ))}
    </div>
  );
}

type StepProps = {
  currentStep: string;
  progress: number;
  step: { path: string; label: string };
  classes?: string;
};
function Step({
  children,
  currentStep,
  progress,
  step,
  classes = "",
}: PropsWithChildren<StepProps>) {
  const isDone = progress >= parseInt(step.path);
  const isCurr = currentStep === step.path;
  return (
    <div className={`group ${classes}`}>
      {/** line */}
      <div
        className={`h-[22px] border-l ${
          isDone ? "border-orange" : "border-prim"
        } my-2 group-first:hidden`}
      />
      <Link
        to={step.path}
        onClick={(e) => (!isDone ? e.preventDefault() : {})}
        className={`flex items-center ${
          isDone ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        {/** circle */}
        <div
          className={`w-4 aspect-square ${
            isDone ? "bg-orange" : "bg-gray-l3 dark:bg-bluegray"
          } rounded-full transform -translate-x-1/2`}
        />
        <span
          className={`text-sm ${
            isCurr ? "text-orange" : "text-gray-d1 dark:text-gray"
          }`}
        >
          {children}
        </span>
      </Link>
    </div>
  );
}
