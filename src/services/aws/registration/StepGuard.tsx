import { FC, PropsWithChildren, createContext, useContext } from "react";
import { RegStep, RegistrationState } from "./types";

function withStepGuard<T extends { step: number }>(Step: FC<T>) {
  return function StepGuard(props: T) {
    const registration = {} as RegistrationState;

    //still initial
    if (registration.step === 0) {
    }

    const { step } = props;
    //going to next step without completing required step
    if (step < registration.step) {
      //redirect to registration.step
    }

    return (
      <Context.Provider value={registration}>
        <Step {...props} />
      </Context.Provider>
    );
  };
}

const Guarded = withStepGuard(StepGuard);

export default function StepGuard({
  step,
  children,
}: PropsWithChildren<{ step: RegStep }>) {
  const registration = {} as RegistrationState;

  //still initial
  if (registration.step === 0) {
  }

  //going to next step without completing required step
  if (step < registration.step) {
    //redirect to registration.step
  }

  return <Context.Provider value={registration}>{children}</Context.Provider>;
}

const Context = createContext<RegistrationState>({} as RegistrationState);

export function useRegState<T extends RegStep>(): Extract<
  RegistrationState,
  { step: T; data: any }
> {
  const val = useContext(Context);
  if (Object.entries(val).length <= 0) {
    throw new Error(
      `${useRegState.name} should only be used inside ${StepGuard.name} context`
    );
  }
  return val as any;
}
