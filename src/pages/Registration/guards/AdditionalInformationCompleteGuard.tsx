import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import RegLoader from "../common/RegLoader";
import routes from "../routes";
import { DocumentationCompleteGuard } from "./DocumentationCompleteGuard";

/**
 * Checks if the charity contact details are submitted and only if they are does it allow
 * them to access the component passed in "props.children", otherwise navigates to /app/register page
 */
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
  const { data: charity, isLoading } = useRegistrationQuery("");

  if (isLoading) {
    return <RegLoader />;
  }

  // No Charity banner set means step 3 wasn't complete
  if (!charity || !charity.Metadata.Banner) {
    return (
      <Navigate to={`${appRoutes.register}/${routes.additionalInformation}`} />
    );
  }

  return <>{props.children}</>;
}
