import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetter } from "store/accessors";
import { app, site } from "constants/routes";

/**
 * Checks if the charity contact person's email is verified and only if it is does it allow
 * them to access the component passed in "props.children", otherwise navigates to /app/register page
 */
export function StepOneCompleteGuard(props: any) {
  const charity = useGetter((state) => state.charity);
  const navigate = useNavigate();

  useEffect(() => {
    if (!charity.ContactPerson.EmailVerified) {
      navigate(`${site.app}/${app.register}`);
    }
  }, [navigate, charity]);

  return <>{props.children}</>;
}
