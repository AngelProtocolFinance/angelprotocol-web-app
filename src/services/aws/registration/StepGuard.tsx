import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { InitReg, RegStep, RegistrationState } from "./types";

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
    }, [stateId]);

    if (state.step === 1 && state.data.init.isEmailVerified) {
      return <Navigate to={"."} />;
    }

    //going to next step without completing required step
    if (thisStep > savedStep) {
      return <Navigate to={`../${savedStep}`} />;
    }

    return (
      <Context.Provider value={state}>
        <Step {...(props as T)} />
      </Context.Provider>
    );
  };
}

export default function StepGuard({
  step,
  children,
}: PropsWithChildren<{ step: RegStep }>) {
  const registration = {} as RegistrationState;

  //still initial

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
