import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRegistrationState } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import RegLoader from "../common/RegLoader";
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
  const { data: charity, isLoading } = useRegistrationState("");

  if (isLoading) {
    return <RegLoader />;
  }

  // No Charity tier set means documentation step wasn't complete
  if (!charity || !charity.Registration.Tier) {
    return <Navigate to={`${appRoutes.register}/${routes.documentation}`} />;
  }

  return <>{props.children}</>;
}
