import { PropsWithChildren, useState } from "react";
import { useMatch } from "react-router-dom";
import { DrawerIcon } from "components/Icon";
import { useGetter } from "store/accessors";
import useHandleScreenResize, { SCREEN_MD } from "hooks/useHandleScreenResize";
import { appRoutes } from "constants/routes";

export default function Progress({ classes = "" }) {
  /** no need to check for /launchpad,since `<Routes/>
   *  always falls back to home outside of /launchpad/1-7 pattern */
  const step = +(
    useMatch(`${appRoutes.register}/steps/:step`)?.params.step || "1"
  );

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
        <Step classes="relative" isDone={p >= 1} isCurr={step === 1}>
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

      {isOtherStepsShown && (
        <>
          <Step isDone={p >= 2} isCurr={step === 2}>
            Management
          </Step>
          <Step isDone={p >= 3} isCurr={step === 3}>
            Whitelists
          </Step>
          <Step isDone={p >= 4} isCurr={step === 4}>
            Maturity
          </Step>
          <Step isDone={p >= 5} isCurr={step === 5}>
            Split of Contribution
          </Step>
          <Step isDone={p >= 6} isCurr={step === 6}>
            Fees
          </Step>
          <Step isDone={p >= 7} isCurr={step === 7}>
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
