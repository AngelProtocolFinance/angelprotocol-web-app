import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import RegLoader from "../common/RegLoader";
import routes from "../routes";

export function ContactDetailsCompleteGuard(props: PropsWithChildren<{}>) {
  const { data: charity, isLoading, isFetching } = useRegistrationQuery("");

  if (isLoading || isFetching) {
    return <RegLoader />;
  }

  if (!charity || !charity.ContactPerson.Email) {
    return <Navigate to={appRoutes.register} />;
  }

  if (
    charity.Registration.RegistrationStatus === "Under Review" ||
    charity.Registration.RegistrationStatus === "Approved" ||
    charity.Registration.RegistrationStatus === "Active"
  ) {
    return <Navigate to={`${appRoutes.register}/${routes.dashboard}`} />;
  }

  return <>{props.children}</>;
}
