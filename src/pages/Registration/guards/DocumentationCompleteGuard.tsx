import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRegistrationState } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import routes from "../routes";
import { ContactDetailsCompleteGuard } from "./ContactDetailsCompleteGuard";

export function DocumentationCompleteGuard(props: PropsWithChildren<{}>) {
  return (
    <ContactDetailsCompleteGuard>
      <InternalGuard {...props} />
    </ContactDetailsCompleteGuard>
  );
}

function InternalGuard(props: PropsWithChildren<{}>) {
  const { charity } = useRegistrationState(); // charity is loaded, ensured by root guard

  // No Charity tier set means documentation step wasn't complete
  if (!charity.Registration.Tier) {
    return <Navigate to={`${appRoutes.register}/${routes.documentation}`} />;
  }

  return <>{props.children}</>;
}
