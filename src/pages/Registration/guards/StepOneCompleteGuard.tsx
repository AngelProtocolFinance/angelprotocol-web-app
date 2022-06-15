import { Navigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes, siteRoutes } from "constants/routes";
import routes from "../routes";

/**
 * Checks if the charity contact person's email is verified and only if it is does it allow
 * them to access the component passed in "props.children", otherwise navigates to /app/register page
 */
export function StepOneCompleteGuard(props: any) {
  const { data: charity, isLoading, isFetching } = useRegistrationQuery("old");

  if (isLoading || isFetching) {
    return <div>loading</div>;
  }

  if (!charity) {
    return <Navigate to={`${siteRoutes.app}/${appRoutes.register}`} />;
  }

  if (!charity.ContactPerson.EmailVerified) {
    return (
      <Navigate
        to={`${siteRoutes.app}/${appRoutes.register}/${routes.confirm}`}
        state={{ is_sent: true }}
      />
    );
  }

  return <>{props.children}</>;
}
