import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRegistrationState } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import routes from "../routes";
import { AdditionalInformationCompleteGuard } from "./AdditionalInformationCompleteGuard";

export function WalletRegistrationCompleteGuard(props: PropsWithChildren<{}>) {
  return (
    <AdditionalInformationCompleteGuard>
      <InternalGuard {...props} />
    </AdditionalInformationCompleteGuard>
  );
}

function InternalGuard(props: PropsWithChildren<{}>) {
  const { charity } = useRegistrationState(); // charity is loaded, ensured by root guard

  // No registered Charity wallet set means step 4 wasn't complete
  if (!charity.Metadata.JunoWallet) {
    return <Navigate to={`${appRoutes.register}/${routes.wallet}`} />;
  }

  return <>{props.children}</>;
}
