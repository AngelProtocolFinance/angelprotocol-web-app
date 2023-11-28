import { PropsWithChildren, useState } from "react";
import { useLocation } from "react-router-dom";
import { RegStep } from "../types";
import { DrawerIcon } from "components/Icon";
import useHandleScreenResize, { SCREEN_MD } from "hooks/useHandleScreenResize";
import { idParamToNum } from "helpers";

type Props = {
  step: RegStep;
  classes?: string;
};

export default function ProgressIndicator({ step, classes = "" }: Props) {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const currPath = idParamToNum(paths.at(-1));

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

  /**
   * Steps are grouped inside an array to make it more easy to:
   * 1. access the currently active step (step number corresponds to step index position in the array)
   * 2. list all steps when the component is expanded
   */
  const steps = [
    null, // skip 0th element so that currPath corresponds to the steps index position in the array
    null, // skip the 1st element (Contact Details)
    <Step isDone={step >= 2} isCurr={currPath === 2}>
      Organization
    </Step>,
    <Step isDone={step >= 3} isCurr={currPath === 3}>
      Non-Profit Status
    </Step>,
    <Step isDone={step >= 4} isCurr={currPath === 4}>
      Documentation
    </Step>,
    <Step isDone={step >= 5} isCurr={currPath === 5}>
      Banking
    </Step>,
  ];

  const topStep =
    isOtherStepsShown || currPath === 1 ? (
      <Step classes="relative" isDone={step >= 1} isCurr={currPath === 1}>
        Contact Details
      </Step>
    ) : (
      steps[currPath]
    );

  return (
    <div className={`py-4 pl-6 pr-4 ${classes} dark:text-gray`}>
      {/* top step toggles the display of other steps on mobile */}
      <button
        className="w-full relative md:hidden"
        onClick={() => setIsOtherStepsShown((prev) => !prev)}
      >
        {topStep}
        <DrawerIcon
          isOpen={isOtherStepsShown}
          size={25}
          className="absolute top-1/2 -right-5 transform -translate-y-1/2"
        />
      </button>
      {/* top step is just another plain step on desktop */}
      <div className="max-md:hidden">{topStep}</div>

      {isOtherStepsShown && steps}
    </div>
  );
}

type StepProps = {
  isDone: boolean;
  isCurr: boolean;
  classes?: string;
};
function Step({
  children,
  isDone,
  isCurr,
  classes = "",
}: PropsWithChildren<StepProps>) {
  return (
    <div className={`group ${classes}`}>
      {/** line */}
      <div
        className={`h-[22px] border-l ${
          isDone ? "border-orange" : "border-prim"
        } my-2 group-first:hidden`}
      />
      <div className="flex items-center">
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
      </div>
    </div>
  );
}
