import useRehydrateUserState from "hooks/useRehydrateUserState";
import { Redirect } from "react-router-dom";
import { app, registration, site } from "types/routes";

export default function RedirectAuth() {
  // we re-hydrate the userData here so that it is available on the next page
  useRehydrateUserState();

  return (
    <Redirect
      to={`${site.app}/${app.register}/${registration.register_wallet}`}
    />
  );
}
