import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { RegStep } from "services/types";
import { idParamToNum } from "helpers";

type Props = {
  step: RegStep;
  classes?: string;
};

export default function ProgressIndicator({ step, classes = "" }: Props) {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const currPath = idParamToNum(paths[paths.length - 1]);

  return (
    <div className={`py-8 ${classes} ml-1 dark:text-gray`}>
      <Step isDone={step >= 1} isCurr={currPath === 1}>
        Contact Details
      </Step>
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
    </div>
  );
}

type StepProps = {
  isDone: boolean;
  isCurr: boolean;
};
function Step({ children, isDone, isCurr }: PropsWithChildren<StepProps>) {
  return (
    <div className="group">
      {/** line */}
      <div
        className={`h-[22px] border-l ${
          isDone ? "border-orange" : "border-bluegray"
        } my-2 group-first:hidden`}
      />
      <div className="flex items-center">
        {/** circle */}
        <div
          className={`w-4 h-4 ${
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
