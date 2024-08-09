import { isEmpty } from "helpers";
import { type FC, createContext, useContext, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { InitReg, RegStep, RegistrationState } from "../types";

export type StepGuardProps = {
  init: InitReg;
  state: RegistrationState;
};

export function withStepGuard<T extends object>(Step: FC<T>) {
  return function StepGuard({
    step: thisStep,
    ...props
  }: T & { step: number }) {
    const { init, state } = useOutletContext<StepGuardProps>();
    const navigate = useNavigate();
    const { step: savedStep } = state;

    // biome-ignore lint/correctness/useExhaustiveDependencies: called only on page load
    useEffect(() => {
      if (thisStep > savedStep + 1) {
        navigate(`../${savedStep}`, { state: init });
      }
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
