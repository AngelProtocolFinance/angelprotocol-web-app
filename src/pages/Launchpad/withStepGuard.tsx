import { FC } from "react";
import { Navigate } from "react-router-dom";
import { Completed, Steps } from "slices/launchpad/types";
import { useGetter } from "store/accessors";

export type Props = {
  step: Steps;
};

type StepProps<T extends Steps> = {
  data: Completed[T] | undefined;
  classes?: string;
};

export function withStepGuard<T extends Steps>(Step: FC<StepProps<T>>) {
  return function StepGuard({ step, ...props }: Props & StepProps<T>) {
    const state = useGetter((state) => state.launchpad);

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
        data={step in state ? (state as any)[step] : undefined}
      />
    );
  };
}
