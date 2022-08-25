import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRegistrationState } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import RegLoader from "../common/RegLoader";
import routes from "../routes";
import { DocumentationCompleteGuard } from "./DocumentationCompleteGuard";

export function AdditionalInformationCompleteGuard(
  props: PropsWithChildren<{}>
) {
  return (
    <DocumentationCompleteGuard>
      <InternalGuard {...props} />
    </DocumentationCompleteGuard>
  );
}

function InternalGuard(props: PropsWithChildren<{}>) {
  const { charity, isLoading } = useRegistrationState();

  if (isLoading) {
    return <RegLoader />;
  }

  // No Charity banner set means additional information step wasn't complete
  if (!charity.Metadata.Banner) {
    return (
      <Navigate to={`${appRoutes.register}/${routes.additionalInformation}`} />
    );
  }

  return <>{props.children}</>;
}
