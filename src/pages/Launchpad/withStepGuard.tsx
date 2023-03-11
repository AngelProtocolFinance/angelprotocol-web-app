import { FC } from "react";
import { Navigate } from "react-router-dom";
import { Completed, Steps } from "slices/launchpad/types";
import { useGetter } from "store/accessors";

export type Props = {
  step: Steps;
  classes?: string;
};

type StepProps<T extends Steps> = {
  data: Completed[T] | undefined;
  classes?: string;
};

export function withStepGuard<T extends Steps>(Step: FC<StepProps<T>>) {
  return function StepGuard({ step, ...props }: Props) {
    const state = useGetter((state) => state.launchpad);

    //user goes to uncompleted step
    if (step > state.progress) {
      const route = state.progress === 1 ? "." : state.progress;
      return <Navigate to={`../${route}`} />;
    }

    return <Step {...props} data={(state as any)[step] || undefined} />;
  };
}
