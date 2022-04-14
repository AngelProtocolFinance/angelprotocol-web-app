import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetter } from "store/accessors";
import { app, site } from "constants/routes";

/**
 * Checks if the user's email is verified and only if it is allows them to access the component passed
 * in "props.children", otherwise navigates to /app/register page.
 */
export function StepOneCompleteGuard(props: any) {
  const user = useGetter((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.ContactPerson.EmailVerified) {
      navigate(`${site.app}/${app.register}`);
    }
  }, [navigate, user]);

  return <>{props.children}</>;
}
