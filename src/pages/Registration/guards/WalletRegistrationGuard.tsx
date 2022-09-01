import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { appRoutes } from "constants/routes";
import {
  getAdditionalInformationStepData,
  isRegistrationEditable,
} from "../helpers";
import routes from "../routes";
import { CommonGuard, GuardLogicFunc } from "./CommonGuard";

export function WalletRegistrationGuard(props: PropsWithChildren<{}>) {
  return <CommonGuard guardLogic={guardLogic}>{props.children}</CommonGuard>;
}

const guardLogic: GuardLogicFunc = (charity, children) => {
  const { isComplete, urlToPreviousStep } =
    getAdditionalInformationStepData(charity);

  if (!isComplete) {
    return <Navigate to={urlToPreviousStep} />;
  }

  if (!isRegistrationEditable(charity)) {
    return <Navigate to={`${appRoutes.register}/${routes.dashboard}`} />;
  }

  return <>{children}</>;
};
