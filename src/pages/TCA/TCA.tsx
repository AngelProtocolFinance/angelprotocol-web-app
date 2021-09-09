import Donator from "components/Donator/Donator";
import { useGetToken } from "contexts/AuthProvider";
import { Redirect } from "react-router";
import { routes } from "types/types";

export default function TCA() {
  const token = useGetToken();
  console.log(token);

  if (!token) {
    return <Redirect to={routes.login} />;
  }

  return (
    <div className="pt-24 grid place-items-center">
      <Donator />
    </div>
  );
}
