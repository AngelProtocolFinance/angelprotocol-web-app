import useRehydrateUserState from "hooks/useRehydrateUserState";
import { Redirect, useRouteMatch } from "react-router-dom";
import { routes } from ".";

export default function RedirectAuth() {
  const { path } = useRouteMatch();

  // we re-hydrate the userData here so that it is available on the next page
  useRehydrateUserState();

  return <Redirect to={`${path}/${routes.submit}`} />;
}
