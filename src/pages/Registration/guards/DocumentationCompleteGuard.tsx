import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
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
  const { data: charity, isLoading } = useRegistrationQuery("");

  if (isLoading) {
    return <RegLoader />;
  }

  // No Charity tier set means step 2 wasn't complete
  if (!charity || !charity.Registration.Tier) {
    return <Navigate to={`${appRoutes.register}/${routes.documentation}`} />;
  }

  return <>{props.children}</>;
}
