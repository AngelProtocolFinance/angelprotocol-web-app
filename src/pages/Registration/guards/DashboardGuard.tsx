import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { appRoutes } from "constants/routes";
import { getWalletRegistrationStepData } from "../helpers";
import { CommonGuard, GuardLogicFunc } from "./CommonGuard";

export function DashboardGuard(props: PropsWithChildren<{}>) {
  return <CommonGuard guardLogic={guardLogic}>{props.children}</CommonGuard>;
}

const guardLogic: GuardLogicFunc = (application, children) => {
  const { isComplete, urlToPreviousStep } =
    getWalletRegistrationStepData(application);

  if (!isComplete) {
    return <Navigate to={urlToPreviousStep} />;
  }

  if (application.Registration.RegistrationStatus === "Active") {
    return <Navigate to={appRoutes.index} />;
  }

  return <>{children}</>;
};
