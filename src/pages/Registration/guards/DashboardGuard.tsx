import { PropsWithChildren, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Charity } from "types/aws";
import { appRoutes } from "constants/routes";
import { getWalletRegistrationStepData } from "../helpers";
import { CommonGuard } from "./CommonGuard";

export function DashboardGuard(props: PropsWithChildren<{}>) {
  return <CommonGuard guardLogic={guardLogic}>{props.children}</CommonGuard>;
}

const guardLogic = (charity: Charity, children?: ReactNode | undefined) => {
  const { isComplete, urlToPreviousStep } =
    getWalletRegistrationStepData(charity);

  if (!isComplete) {
    return <Navigate to={urlToPreviousStep} />;
  }

  if (charity.Registration.RegistrationStatus === "Active") {
    return <Navigate to={appRoutes.index} />;
  }

  return <>{children}</>;
};
