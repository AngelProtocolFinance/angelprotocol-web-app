import { app, site } from "constants/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetter } from "store/accessors";
import routes from "../routes";

/**
 * Checks if the user has submitted their contact details and only if they have does this guard allow them
 * to access the component passed in "props.children", otherwise navigates to /app/register page.
 */
export function StepOneInitiatedGuard(props: any) {
  const user = useGetter((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.EmailVerified || (!user.PK && !user.Website)) {
      navigate(`${site.app}/${app.register}/${routes.dashboard}`);
    }
  }, [navigate, user]);

  return <>{props.children}</>;
}
