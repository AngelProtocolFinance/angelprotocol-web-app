import { PropsWithChildren, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Charity } from "types/aws";
import { appRoutes } from "constants/routes";
import routes from "../routes";
import { CommonGuard } from "./CommonGuard";
import { getDocumentationStepData } from "./stepChecks";

export function AdditionalInformationGuard(props: PropsWithChildren<{}>) {
  return <CommonGuard guardLogic={guardLogic}>{props.children}</CommonGuard>;
}

const guardLogic = (charity: Charity, children?: ReactNode | undefined) => {
  const { isComplete, urlToPreviousStep } = getDocumentationStepData(charity);

  if (!isComplete) {
    return <Navigate to={urlToPreviousStep} />;
  }

  if (
    charity.Registration.RegistrationStatus === "Under Review" ||
    charity.Registration.RegistrationStatus === "Approved" ||
    charity.Registration.RegistrationStatus === "Active"
  ) {
    return <Navigate to={`${appRoutes.register}/${routes.dashboard}`} />;
  }

  return <>{children}</>;
};
