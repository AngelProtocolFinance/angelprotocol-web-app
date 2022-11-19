import { PropsWithChildren, useState } from "react";
import { useLocation } from "react-router-dom";
import { RegStep } from "services/types";
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
  const currPath = idParamToNum(paths[paths.length - 1]);

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
    150,
    { isOpen: true },
    { shouldAttachListener: true, shouldCallOnResizeOnLoad: true }
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
          <Step isDone={step >= 2} isCurr={currPath === 2}>
            Documentation
          </Step>
          <Step isDone={step >= 3} isCurr={currPath === 3}>
            Profile
          </Step>
          <Step isDone={step >= 4} isCurr={currPath === 4}>
            Wallet address
          </Step>
          <Step isDone={step >= 5} isCurr={currPath === 5}>
            Summary
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
          isDone ? "border-orange" : "border-bluegray"
        } my-2 group-first:hidden`}
      />
      <div className="flex items-center">
        {/** circle */}
        <div
          className={`w-4 aspect-square ${
            isDone ? "bg-orange" : "bg-bluegray"
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
