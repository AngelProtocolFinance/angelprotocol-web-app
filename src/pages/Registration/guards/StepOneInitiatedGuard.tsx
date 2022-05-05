import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetter } from "store/accessors";
import { app, site } from "constants/routes";
import routes from "../routes";

/**
 * Checks if the charity has submitted their contact details and only if they have does this guard allow them
 * to access the component passed in "props.children", otherwise navigates to /app/register/dashboard page
 */
export function StepOneInitiatedGuard(props: any) {
  const charity = useGetter((state) => state.charity);
  const navigate = useNavigate();

  useEffect(() => {
    // if EmailVerified === true this means the charity has finished step 1 but hasn't initiated an update of contact details
    // if `!charity.ContactPerson.Email`, this means the charity hasn't even completed step 1
    // in both cases we navigate to dashboard and let its guard decide whether they should be allowed in
    if (charity.ContactPerson.EmailVerified || !charity.ContactPerson.Email) {
      navigate(`${site.app}/${app.register}/${routes.dashboard}`);
    }
  }, [navigate, charity]);

  return <>{props.children}</>;
}
