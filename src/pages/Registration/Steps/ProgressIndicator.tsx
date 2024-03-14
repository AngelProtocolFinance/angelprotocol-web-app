import { DrawerIcon } from "components/Icon";
import { idParamToNum } from "helpers";
import useHandleScreenResize, {
  SCREEN_BREAKPOINTS,
} from "hooks/useHandleScreenResize";
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

  useHandleScreenResize(
    (screen, ref) => {
      const shouldOpen =
        screen >= SCREEN_BREAKPOINTS.md; /** tailwind md screen size */
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
        <Step classes="relative" isDone={step >= 1} isCurr={currPath === 1}>
          Contact Details
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

      {isOtherStepsShown && (
        <>
          <Step isDone={step >= 2} isCurr={currPath === 2} key={2}>
            Organization
          </Step>
          <Step isDone={step >= 3} isCurr={currPath === 3} key={3}>
            Nonprofit Status
          </Step>
          <Step isDone={step >= 4} isCurr={currPath === 4} key={4}>
            Documentation
          </Step>
          <Step isDone={step >= 5} isCurr={currPath === 5} key={5}>
            Banking
          </Step>
        </>
      )}
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
          isDone ? "border-blue-d1" : "border-gray-l4"
        } my-2 group-first:hidden`}
      />
      <div className="flex items-center">
        {/** circle */}
        <div
          className={`w-4 aspect-square ${
            isDone ? "bg-blue-d1" : "bg-gray-l3 dark:bg-navy"
          } rounded-full transform -translate-x-1/2`}
        />
        <span
          className={`text-sm ${
            isCurr ? "text-blue-d1" : "text-navy-l1 dark:text:navy-l2"
          }`}
        >
          {children}
        </span>
      </div>
    </div>
  );
}
