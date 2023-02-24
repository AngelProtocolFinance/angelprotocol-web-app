import { DrawerIcon } from "@ap/components/icon";
import { SCREEN_MD, useHandleScreenResize } from "@ap/hooks";
import { PropsWithChildren, useState } from "react";

export default function ProgressIndicator({ classes = "" }) {
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
        <Step classes="relative" isDone={true} isCurr={true}>
          Step1
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
          <Step isDone={false} isCurr={false}>
            Step2
          </Step>
          <Step isDone={false} isCurr={false}>
            Step3
          </Step>
          <Step isDone={false} isCurr={false}>
            Step4
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
