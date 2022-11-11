import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { InitReg, RegStep, RegistrationState } from "./types";

export type StepGuardProps = {
  init: InitReg;
  state: RegistrationState;
  stateId: string;
  step: number;
};

export function withStepGuard<T extends object>(Step: FC<T>) {
  return function StepGuard({
    step,
    init,
    state,
    stateId,
    ...props
  }: T & StepGuardProps) {
    const idRef = useRef(stateId);
    const navigate = useNavigate();

    console.log(state);

    useEffect(() => {
      if (idRef.current !== stateId) {
        if ("nav" in state && "next" in state.nav) {
          if (state.nav.next) {
            navigate(`../${state.nav.next}`, { state: init });
          } else if (step < state.step) {
            navigate(`../${step + 1}`, { state: init });
          }
        }
      }
      idRef.current = stateId;
    }, [stateId]);

    //going to next step without completing required step
    if (step < state.step) {
      //redirect to registration.step
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
