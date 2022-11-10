import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { RegStep, RegistrationState } from "./types";

export function withStepGuard<T extends object>(Step: FC<T>) {
  return function StepGuard({
    step,
    state,
    stateId,
    ...props
  }: T & { state: RegistrationState; step: number; stateId: string }) {
    const idRef = useRef(stateId);
    const navigate = useNavigate();

    useEffect(() => {
      if (idRef.current !== stateId) {
        if ("data" in state) {
          console.log("navigate");
          navigate(`../${step + 1}`, { state: state.data.init });
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
