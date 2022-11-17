import { FC, createContext, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InitReg, RegStep, RegistrationState } from "services/types";

export type StepGuardProps = {
  init: InitReg;
  state: RegistrationState;
  stateId: string;
  step: number;
};

export function withStepGuard<T extends object>(Step: FC<T>) {
  return function StepGuard({
    step: thisStep,
    init,
    state,
    stateId,
    ...props
  }: T & StepGuardProps) {
    const idRef = useRef(stateId);
    const navigate = useNavigate();

    const { step: savedStep } = state;

    useEffect(() => {
      if (idRef.current !== stateId) {
        /** if reg is complete, mutations should redirect to summary */
        if (thisStep < savedStep && savedStep === 5) {
          navigate(`../${savedStep}`, { state: init });
          /** if not complete, just go to next step */
        } else if (thisStep < savedStep) {
          navigate(`../${thisStep + 1}`, { state: init });
        }
      }
      idRef.current = stateId;
      //eslint-disable-next-line
    }, [stateId]);

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
  if (Object.entries(val).length <= 0) {
    throw new Error(
      `${useRegState.name} should only be used inside ${withStepGuard.name} context`
    );
  }
  return val as any;
}
