import { app, site } from "constants/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetter } from "store/accessors";
import routes from "../routes";

/**
 * Checks if the user has submitted their contact details and only if they have does this guard allow them
 * to access the component passed in "props.children", otherwise navigates to /app/register/dashboard page.
 */
export function StepOneInitiatedGuard(props: any) {
  const user = useGetter((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // if EmailVerified === true this means the user has finished step 1 but hasn't initiated an update of contact details
    // if (!user.PK && !user.Website), this means the user hasn't even completed step 1
    // in both cases we navigate to dashboard and let its guard decide whether they should be allowed in
    if (
      user.ContactPerson.EmailVerified ||
      (!user.ContactPerson.PK && !user.Registration.Website)
    ) {
      navigate(`${site.app}/${app.register}/${routes.dashboard}`);
    }
  }, [navigate, user]);

  return <>{props.children}</>;
}
