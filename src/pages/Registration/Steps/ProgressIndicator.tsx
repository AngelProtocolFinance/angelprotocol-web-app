import { DrawerIcon } from "components/Icon";
import { idParamToNum } from "helpers";
import useHandleScreenResize, { SCREEN_MD } from "hooks/useHandleScreenResize";
import { PropsWithChildren, useState } from "react";
import { useLocation } from "react-router-dom";
import { RegStep } from "../types";

type Props = {
  step: RegStep;
  classes?: string;
};

export default function ProgressIndicator({ step, classes = "" }: Props) {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const currPath = idParamToNum(paths.at(-1));

  const [isOtherStepsShown, setIsOtherStepsShown] = useState(true);
  const [isDesktop, setDesktop] = useState(window.innerWidth >= SCREEN_MD);

  useHandleScreenResize(
    (screen, ref) => {
      const isOnDesktop = screen >= SCREEN_MD; /** tailwind md screen size */
      if ((isOnDesktop && !ref.isOpen) || (!isOnDesktop && ref.isOpen)) {
        setIsOtherStepsShown(isOnDesktop);
        ref.isOpen = isOnDesktop;
      }

      if (ref.isDesktop !== isOnDesktop) {
        setDesktop(isOnDesktop);
      }
    },
    {
      shouldAttachListener: true,
      shouldCallOnResizeOnLoad: true,
      debounceTime: 150,
      ref: { isOpen: isOtherStepsShown, isDesktop },
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
    <Step isDone={step >= 2} isCurr={currPath === 2} key={2}>
      Organization
    </Step>,
    <Step isDone={step >= 3} isCurr={currPath === 3} key={3}>
      Nonprofit Status
    </Step>,
    <Step isDone={step >= 4} isCurr={currPath === 4} key={4}>
      Documentation
    </Step>,
    <Step isDone={step >= 5} isCurr={currPath === 5} key={5}>
      Banking
    </Step>,
  ];

  const topStep =
    isOtherStepsShown || currPath === 1 ? (
      <Step isDone={currPath > 1 || step > 1} isCurr={currPath === 1}>
        Contact Details
      </Step>
    ) : (
      steps[currPath]
    );

  const children = (
    <>
      <div className="w-full relative">
        {topStep}
        <DrawerIcon
          isOpen={isOtherStepsShown}
          size={25}
          className="absolute top-1/2 -right-5 transform -translate-y-1/2 md:hidden"
        />
      </div>

      {isOtherStepsShown && steps}
    </>
  );

  const classNames = `py-4 max-md:pr-10 pl-12 md:pl-14 md:mr-14 ${classes} dark:text-gray`;

  if (isDesktop) {
    return <div className={classNames}>{children}</div>;
  }

  return (
    <button
      className={`${classNames} cursor-pointer`}
      onClick={() => setIsOtherStepsShown((prev) => !prev)}
    >
      {children}
    </button>
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
          isDone || isCurr ? "border-orange" : "border-prim"
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
