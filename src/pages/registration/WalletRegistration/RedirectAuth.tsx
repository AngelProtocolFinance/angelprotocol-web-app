import useRehydrateUserState from "hooks/useRehydrateUserState";
import { Redirect, useRouteMatch } from "react-router-dom";
import { routes } from "./constants";

export default function RedirectAuth() {
  // this will only render under '/app/register/wallet/auth', so we need to remove the '/auth' part
  const { path } = useRouteMatch();
  const rootPath = path.substring(0, path.lastIndexOf("/"));

  // we re-hydrate the userData here so that it is available on the next page
  useRehydrateUserState();

  return <Redirect to={`${rootPath}/${routes.submit}`} />;
}
