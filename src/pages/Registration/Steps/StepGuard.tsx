import { FC, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InitReg, RegStep, RegistrationState } from "../types";
import { isEmpty } from "helpers";

export type StepGuardProps = {
  init: InitReg;
  state: RegistrationState;
  step: number;
};

export function withStepGuard<T extends object>(Step: FC<T>) {
  return function StepGuard({
    step: thisStep,
    init,
    state,
    ...props
  }: T & StepGuardProps) {
    const navigate = useNavigate();

    const { step: savedStep } = state;

    useEffect(() => {
      if (thisStep > savedStep + 1) {
        navigate(`../${savedStep}`, { state: init });
      }
      //eslint-disable-next-line
    }, []);

    return (
      <Context.Provider value={state}>
        <Step {...(props as T)} />
      </Context.Provider>
    );
  };
}

const Context = createContext<RegistrationState>({} as RegistrationState);

export function useRegState<T extends RegStep>(): Extract<
  RegistrationState,
  { step: T; data: any }
> {
  const val = useContext(Context);
  if (isEmpty(Object.entries(val))) {
    throw new Error(
      `${useRegState.name} should only be used inside ${withStepGuard.name} context`
    );
  }
  return val as any;
}
