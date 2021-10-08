import Donator from "components/Donator/Donator";
import TCAForm from "./TCAForm";
import AppHead from "components/Headers/AppHead";
import { useGetToken } from "contexts/AuthProvider";
import { Redirect } from "react-router-dom";
import { app, site } from "types/routes";

export default function TCA() {
  const decodedToken = useGetToken();

  //user can't access TCA page when not logged in or his prev token expired
  if (!decodedToken) {
    return <Redirect to={`${site.app}/${app.login}`} />;
  }

  return (
    <div className="grid grid-rows-a1 place-items-center min-h-screen pt-2 pb-16">
      <AppHead />
      <Donator to="fund">
        <TCAForm />
      </Donator>
    </div>
  );
}
