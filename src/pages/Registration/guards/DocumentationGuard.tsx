import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { appRoutes } from "constants/routes";
import { getContactDetailsStepData, isRegistrationEditable } from "../helpers";
import routes from "../routes";
import { CommonGuard, GuardLogicFunc } from "./CommonGuard";

export function DocumentationGuard(props: PropsWithChildren<{}>) {
  return <CommonGuard guardLogic={guardLogic}>{props.children}</CommonGuard>;
}

const guardLogic: GuardLogicFunc = (application, children) => {
  const { isComplete, urlToPreviousStep } =
    getContactDetailsStepData(application);

  if (!isComplete) {
    return <Navigate to={urlToPreviousStep} />;
  }

  if (!isRegistrationEditable(application)) {
    return <Navigate to={`${appRoutes.register}/${routes.dashboard}`} />;
  }

  return <>{children}</>;
};
