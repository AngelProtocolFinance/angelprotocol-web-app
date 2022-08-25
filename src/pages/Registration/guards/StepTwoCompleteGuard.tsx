import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import RegLoader from "../common/RegLoader";
import routes from "../routes";
import { StepOneCompleteGuard } from "./StepOneCompleteGuard";

/**
 * Checks if the charity contact details are submitted and only if they are does it allow
 * them to access the component passed in "props.children", otherwise navigates to /app/register page
 */
export function StepTwoCompleteGuard(props: PropsWithChildren<{}>) {
  return (
    <StepOneCompleteGuard>
      <InternalGuard {...props} />
    </StepOneCompleteGuard>
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
