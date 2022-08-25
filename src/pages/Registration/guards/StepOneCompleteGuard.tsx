import { Navigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import RegLoader from "../common/RegLoader";

/**
 * Checks if the charity contact details are submitted and only if they are does it allow
 * them to access the component passed in "props.children", otherwise navigates to /app/register page
 */
export function StepOneCompleteGuard(props: any) {
  const { data: charity, isLoading } = useRegistrationQuery("");

  if (isLoading) {
    return <RegLoader />;
  }

  if (!charity || !charity.ContactPerson.Email) {
    return <Navigate to={appRoutes.register} />;
  }

  return <>{props.children}</>;
}
