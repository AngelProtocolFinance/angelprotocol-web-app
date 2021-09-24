import Donator from "components/Donator/Donator";
import { useGetToken } from "contexts/AuthProvider";
import { Redirect } from "react-router";
import { routes } from "types/types";

export default function TCA() {
  const decodedToken = useGetToken();

  //user can't access TCA page when not logged in or his prev token expired
  if (!decodedToken) {
    return <Redirect to={routes.login} />;
  }

  return (
    <div className="pt-24 grid place-items-center h-banner">
      <Donator />
    </div>
  );
}
