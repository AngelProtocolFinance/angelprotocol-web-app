import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import RegLoader from "../common/RegLoader";
import routes from "../routes";
import { StepThreeCompleteGuard } from "./StepThreeCompleteGuard";

/**
 * Checks if the charity contact details are submitted and only if they are does it allow
 * them to access the component passed in "props.children", otherwise navigates to /app/register page
 */
export function StepFourCompleteGuard(props: PropsWithChildren<{}>) {
  return (
    <StepThreeCompleteGuard>
      <InternalGuard {...props} />
    </StepThreeCompleteGuard>
  );
}

function InternalGuard(props: PropsWithChildren<{}>) {
  const { data: charity, isLoading } = useRegistrationQuery("");

  if (isLoading) {
    return <RegLoader />;
  }

  // No registered Charity wallet set means step 4 wasn't complete
  if (!charity || !charity.Metadata.JunoWallet) {
    return <Navigate to={`${appRoutes.register}/${routes.wallet}`} />;
  }

  // if EmailVerified === true this means the charity has finished step 1 but hasn't initiated an update of contact details
  // we therefore navigate to dashboard and let its guard decide whether they should be allowed in
  if (charity.ContactPerson.EmailVerified) {
    return <Navigate to={`${appRoutes.register}/${routes.dashboard}`} />;
  }

  return <>{props.children}</>;
}
