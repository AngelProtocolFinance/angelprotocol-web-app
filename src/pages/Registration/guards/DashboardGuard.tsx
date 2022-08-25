import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRegistrationState } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import RegLoader from "../common/RegLoader";
import routes from "../routes";
import { AdditionalInformationCompleteGuard } from "./AdditionalInformationCompleteGuard";

export function DashboardGuard(props: PropsWithChildren<{}>) {
  return (
    <AdditionalInformationCompleteGuard>
      <InternalGuard {...props} />
    </AdditionalInformationCompleteGuard>
  );
}

function InternalGuard(props: PropsWithChildren<{}>) {
  const { data: charity, isLoading } = useRegistrationState("");

  if (isLoading) {
    return <RegLoader />;
  }

  // No registered Charity wallet set means step 4 wasn't complete
  if (!charity || !charity.Metadata.JunoWallet) {
    return <Navigate to={`${appRoutes.register}/${routes.wallet}`} />;
  }

  return <>{props.children}</>;
}
