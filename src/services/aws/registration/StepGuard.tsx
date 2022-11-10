import { PropsWithChildren, createContext, useContext } from "react";
import { useMatch, useParams } from "react-router-dom";
import { RegStep, RegistrationState } from "./types";
import { idParamToNum } from "helpers";

/**
 * any page
 * /contact
 * /docs
 * /profile
 * /wallet
 *
 * can access registration state and need to decide if state is
 * complete for that specific page
 */

const steps: RegStep[] = [1, 2, 3, 4];

function StepGuard(props: PropsWithChildren<{}>) {
  const { step } = useParams();
  const registration = {} as RegistrationState;

  //still initial
  if (registration.step === 0) {
  }

  const currStep = idParamToNum(step);
  //not valid step
  if (!steps.includes(currStep as RegStep)) {
    //redirect to home
  }

  //going to next step without completing required step
  if (currStep < registration.step) {
    //redirect to registration.step
  }

  return (
    <Context.Provider value={registration}>{props.children}</Context.Provider>
  );
}

const Context = createContext<RegistrationState>({} as RegistrationState);

function useRegState<T extends RegStep>(): Extract<
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
