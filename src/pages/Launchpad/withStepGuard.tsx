import { FC, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Completed, Steps } from "slices/launchpad/types";
import { useGetter } from "store/accessors";

export type Props = {
  step: Steps;
};

export function withStepGuard<T extends object>(
  Step: FC<{ state: Completed[Steps] | undefined }>
) {
  return function StepGuard({ step, ...props }: T & Props) {
    const state = useGetter((state) => state.launchpad);
    const navigate = useNavigate();
    const currRef = useRef(step);

    //if no progress, go to step1
    if (state.progress === 0) {
      return <Navigate to={"../1"} />;
    }

    //user goes to uncompleted step
    if (step > state.progress) {
      return <Navigate to={`../${state.progress}`} />;
    }

    return (
      <Step
        {...props}
        state={step in state ? (state as any)[step] : undefined}
      />
    );
  };
}
