import { Navigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes, siteRoutes } from "constants/routes";
import RegLoader from "../common/RegLoader";
import routes from "../routes";

/**
 * Checks if the charity contact person's email is verified and only if it is does it allow
 * them to access the component passed in "props.children", otherwise navigates to /app/register page
 */
export function StepOneCompleteGuard(props: any) {
  const { data: charity, isLoading, isFetching } = useRegistrationQuery("");

  if (isLoading || isFetching) {
    return <RegLoader />;
  }

  if (!charity) {
    return <Navigate to={appRoutes.register} />;
  }

  if (!charity!.ContactPerson.EmailVerified) {
    return (
      <Navigate
        to={`${appRoutes.register}/${routes.confirm}`}
        state={{ is_sent: true }}
      />
    );
  }

  return <>{props.children}</>;
}
