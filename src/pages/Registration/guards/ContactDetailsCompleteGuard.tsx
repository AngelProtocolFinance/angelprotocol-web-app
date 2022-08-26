import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import RegLoader from "../common/RegLoader";
import routes from "../routes";

export function ContactDetailsCompleteGuard(props: PropsWithChildren<{}>) {
  const { data: charity, isLoading } = useRegistrationQuery("");

  if (isLoading) {
    return <RegLoader />;
  }

  if (!charity || !charity.ContactPerson.Email) {
    return <Navigate to={appRoutes.register} />;
  }

  // if EmailVerified === true this means the charity has finished contact details step but hasn't initiated an update of contact details
  // we therefore navigate to dashboard and let its guard decide whether they should be allowed in
  if (charity.ContactPerson.EmailVerified) {
    return <Navigate to={`${appRoutes.register}/${routes.dashboard}`} />;
  }

  return <>{props.children}</>;
}
