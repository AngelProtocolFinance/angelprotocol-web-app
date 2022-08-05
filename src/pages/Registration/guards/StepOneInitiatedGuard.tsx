import { Navigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import RegLoader from "../common/RegLoader";
import { placeHolderCharity } from "../constants";
import routes from "../routes";

/**
 * Checks if the charity has submitted their contact details and only if they have does this guard allow them
 * to access the component passed in "props.children", otherwise navigates to /app/register/dashboard page
 */
export function StepOneInitiatedGuard(props: any) {
  const {
    data: charity = placeHolderCharity,
    isLoading,
    isFetching,
  } = useRegistrationQuery("");

  if (isLoading || isFetching) {
    return <RegLoader />;
  }

  if (!charity) {
    return <Navigate to={appRoutes.register} />;
  }

  // if EmailVerified === true this means the charity has finished step 1 but hasn't initiated an update of contact details
  // if `!charity.ContactPerson.Email`, this means the charity hasn't even completed step 1
  // in both cases we navigate to dashboard and let its guard decide whether they should be allowed in
  if (charity.ContactPerson.EmailVerified || !charity.ContactPerson.Email) {
    return <Navigate to={`${appRoutes.register}/${routes.dashboard}`} />;
  }

  return <>{props.children}</>;
}
